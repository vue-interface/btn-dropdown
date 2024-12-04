import { Instance, Placement, createPopper } from '@popperjs/core';
import { ComponentPublicInstance, ComputedRef, computed, onBeforeMount, ref } from 'vue';

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
    (name: 'click-toggle', e: MouseEvent): void,
    (name: 'blur', e: FocusEvent): void
}

export function useBtnDropdown<Props extends BtnDropdownProps, Emits extends BtnDropdownEmits>(props: Props, emit: Emits) {
    const expanded = ref(false);
    const triggerAnimation = ref(false);
    const popper = ref<Instance>();
    const button = ref<Element|ComponentPublicInstance>();
    const target = ref<Element|ComponentPublicInstance>();
    const menu = ref<Element|ComponentPublicInstance>();

    const $button: any = (ref) => {
        button.value = ref;
    }

    const buttonEl = computed<HTMLButtonElement|undefined>(() => 
        button.value instanceof Element
            ? button.value
            : button.value?.$el
    );

    const targetEl = computed<Element|undefined>(() => 
        target.value instanceof Element
            ? target.value
            : target.value?.$el
    );

    const menuEl = computed<Element|undefined>(() => 
        menu.value instanceof Element
            ? menu.value
            : menu.value?.$el
    );

    const classes = computed(() => ({
        [props.size]: !!props.size,        
        'dropdown': props.dropdown || !(props.dropright || props.dropleft || props.dropup),
        'dropup': props.dropup,
        'dropright': props.dropright,
        'dropleft': props.dropleft,
        'expanded': expanded.value,
    }));

    const actionClasses = computed(() => ({
        [props.variant]: !!props.variant,
        ...buttonsClasses.value,
    }));

    const buttonsClasses: ComputedRef<{
        btn: true,
        [x: string]: boolean
    }> = computed(() => {
        const buttonClass = typeof props.buttonClass === 'object'
            ? props.buttonClass
            : {[props.buttonClass]: !!props.buttonClass};
            
        return {
            btn: true,
            ...buttonClass
        };
    });

    const toggleClasses = computed(() => ({
        'active': props.active,
        'dropdown-toggle': true,
        'dropdown-toggle-split': props.split,
        [props.variant]: !!props.variant,
        ...buttonsClasses.value,
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

        return 'start';
    });
    
    function show() {
        buttonEl.value?.focus();
        
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

    function onBlur(e: FocusEvent) {
        emit('blur', e);

        if(e.defaultPrevented) {
            return;
        }

        if(menuEl.value && !menuEl.value?.contains((e as any).relatedTarget) || !menuEl.value?.contains((e as any).relatedTarget)) {
            hide();
        }
    }

    function onClickItem(e: any) {
        if(!isFocusable(e.target)) {
            hide();
        }
    }

    function onClickToggle(e: MouseEvent) {
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
        button,
        $button,
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
    };
}