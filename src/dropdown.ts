import { Instance, Placement, createPopper } from '@popperjs/core';
import { ComponentPublicInstance, computed, onBeforeMount, ref } from 'vue';

export type BtnDropdownProps = {
    active?: boolean,
    align?: 'left' | 'right',
    buttonClass?: string|Record<string|undefined,boolean>,
    dropdown?: boolean,
    dropup?: boolean,
    dropleft?: boolean,
    dropright?: boolean,
    label?: string,
    offset?: number,
    size?: string,
    split?: boolean,
    variant?: string,
}

export type BtnDropdownEmits = {
    (name: 'click', e: PointerEvent): void,
    (name: 'click-toggle', e: PointerEvent): void
}

export function useBtnDropdown<Props extends BtnDropdownProps, Emits extends BtnDropdownEmits>(props: Props, emit: Emits) {
    const expanded = ref(false);
    const triggerAnimation = ref(false);
    const popper = ref<Instance>();
    const target = ref<HTMLElement|ComponentPublicInstance>();
    const menu = ref<HTMLElement|ComponentPublicInstance>();

    const targetEl = computed(() => 
        target.value instanceof HTMLElement
            ? target.value
            : target.value.$el
    );

    const menuEl = computed(() => 
        menu.value instanceof HTMLElement
            ? menu.value
            : menu.value.$el
    );

    const classes = computed(() => ({
        [props.size]: !!props.size,
        
        'dropdown': props.dropdown || !(props.dropright || props.dropleft || props.dropup),
        'dropup': props.dropup,
        'dropright': props.dropright,
        'dropleft': props.dropleft,
        // 'icon-only': !this.nav && !this.split && !!this.$slots.icon && !this.$slots.label,
        // 'hide-caret': !this.caret,
        'expanded': expanded.value,
        // 'rotate-90': !this.nav && this.split && this.rotate && this.expanded,
    }));

    const actionClasses = computed(() => ({
        // [props.size]: !!props.size,
        [props.variant]: !!props.variant,
        
        ...buttonsClasses.value,
    }));

    const buttonsClasses = computed(() => {
        if(typeof props.buttonClass === 'object') {
            return { btn: true, ...props.buttonClass };
        }

        return {
            btn: true,
            [props.buttonClass]: !!props.buttonClass
        }
    });

    const toggleClasses = computed(() => ({
        'active': props.active,
        'dropdown-toggle': true,
        'dropdown-toggle-split': props.split,
        // [props.size]: !!props.size,
        [props.variant]: !!props.variant,
        
        ...buttonsClasses.value,

        // toggleClasses() {
        //     return Object.assign({
        //         'active': this.active,
        //         'btn': !this.nav,
        //         'btn-block': !!this.block,
        //         'nav-link': !!this.nav,
        //         'rotate-90': !this.split && this.rotate && this.expanded,
        //         'dropdown-toggle': true,
        //         'dropdown-toggle-split': !this.nav && this.split,
        //         [this.variant]: !this.nav && !!this.variant,
        //         [this.size]: !!this.size,
        //     }, typeof this.buttonClass === 'object' ? this.buttonClass : {
        //         [this.buttonClass]: !!this.buttonClass
        //     });
        // }
    }));

    const placement = computed(() => {
        if(props.dropup) {
            return 'top';
        }

        if(props.dropleft) {
            return 'left';
        }

        if(props.dropright) {
            return 'right';
        }

        return 'bottom';
    });
    
    const align = computed(() => {
        if(props.align) {
            return props.align === 'right' ? 'end' : 'start';
        }

        return 'start'
    });
    
    function show() {
        expanded.value = true;

        if(!popper.value) {
            popper.value = createPopper(targetEl.value, menuEl.value.querySelector('.dropdown-menu'), {
                placement: `${placement.value}-${align.value}` as Placement,
                onFirstUpdate: () => {
                    triggerAnimation.value = true;
                },
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, props.offset ?? 5]
                        },
                    },
                ]
            });
        }
        else {
            popper.value.update();
        }
    }

    function hide() {
        expanded.value = false;
    }

    function toggle() {
        !expanded.value ? show() : hide();
    }
    
    function queryFocusable() {
        return menuEl.value && menuEl.value.querySelectorAll(
            'label, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
    }

    function isFocusable(element: HTMLElement) {
        const nodes = queryFocusable();

        for(const i in nodes) {
            if(element === nodes[i]) {
                return true;
            }
        }

        return false;
    }

    function onBlur(e: any) {
        if(menuEl.value && !menuEl.value.contains(e.relatedTarget) || !menuEl.value.contains(e.relatedTarget)) {
            hide();
        }
    }

    function onClickItem(e: any) {
        if(!isFocusable(e.target)) {
            hide();
        }
    }

    function onClickToggle(e: PointerEvent) {
        e.target.dispatchEvent(new Event('focus', e));
            
        emit('click-toggle', e);

        if(!e.defaultPrevented) {
            toggle();
        }
    }

    function onKeydown(e: KeyboardEvent) {
        if(targetEl.value.parentElement?.lastElementChild === e.target) {
            hide();
        }
    }

    onBeforeMount(() => {
        popper.value && popper.value.destroy();
    });

    return {
        actionClasses,
        classes,
        expanded,
        menu,
        target,
        toggleClasses,
        triggerAnimation,
        hide,
        show,
        toggle,
        onBlur,
        onClickItem,
        onClickToggle,
        onKeydown
    }
}