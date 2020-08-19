import BtnDropdownAction from './BtnDropdownAction';
import { createPopper } from '@popperjs/core';
import Btn from '@vue-interface/btn';
import { BtnGroup } from '@vue-interface/btn-group';
import DropdownMenu from '@vue-interface/dropdown-menu';
import { prefix } from '@vue-interface/utils';

const TAB_KEYCODE = 9;

export default {

    components: {
        BtnDropdownAction,
        BtnGroup,
        DropdownMenu
    },

    extends: Btn,

    props: {

        /**
         * Should animate the dropdown opening.
         *
         * @property String
         */
        animated: {
            type: Boolean,
            default: true
        },

        /**
         * The button icon that appears before the label.
         *
         * @property String
         */
        autoclose: Boolean,

        /**
         * The toggle button's label. If not defined as an attribute,
         * you can override with the component's slot (inner html).
         *
         * @property String
         */
        label: String,

        /**
         * The button type attribute.
         *
         * @property String
         */
        type: {
            type: String,
            default: 'button'
        },

        /**
         * Display the dropdown menu aligned left or right
         *
         * @property String
         */
        align: {
            type: String,
            default: 'left',
            validate(value) {
                return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
            }
        },

        /**
         * Display the dropdown button with a split toggle button.
         *
         * @property Boolean
         */
        split: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropup instead of a dropdown.
         *
         * @property Boolean
         */
        dropup: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropright instead of a dropdown.
         *
         * @property Boolean
         */
        dropright: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropleft instead of a dropdown.
         *
         * @property Boolean
         */
        dropleft: {
            type: Boolean,
            default: false
        }

    },

    data() {
        return {
            popper: null,
            triggerAnimation: false,
            isDropdownShowing: false
        };
    },

    computed: {
        placement() {
            if(this.dropup) {
                return 'top';
            }

            if(this.dropleft) {
                return 'left';
            }

            if(this.dropright) {
                return 'right';
            }

            return 'bottom';
        },

        variantClassPrefix() {
            return 'btn' + (this.outline ? '-outline' : '');
        },

        sizeableClassPrefix() {
            return 'btn';
        },

        classes() {
            return {
                'dropdown': this.dropup && this.dropright && this.dropleft,
                'dropup': this.dropup,
                'dropright': this.dropright,
                'dropleft': this.dropleft
            };
        },

        actionClasses() {
            return [
                'btn',
                prefix(this.size, 'btn'),
                prefix(this.variant, 'btn')
            ].join(' ');
        },

        toggleClasses() {
            return [
                'btn',
                'dropdown-toggle',
                this.variantClass,
                this.sizeableClass,
                this.active ? 'active' : '',
                this.block ? 'btn-block' : '',
                (this.split ? 'dropdown-toggle-split' : '')
            ].join(' ');
        }
    },

    mounted() {
        const toggle = this.$el.querySelector('.dropdown-toggle');

        toggle.addEventListener('click', () => {
            if(!this.isDropdownShowing) {
                toggle.blur();
            }
        });

        toggle.addEventListener('blur', this.onBlurItem);

        const menu = this.$el.querySelector('.dropdown-menu');

        menu.addEventListener('click', e => {
            if(e.target === menu) {
                toggle.focus();
            }
        });
    },

    methods: {

        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        focus() {
            this.$el.querySelector('.dropdown-toggle').focus();
        },

        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        queryFocusable() {
            return this.$el.querySelector('.dropdown-menu').querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        },

        /**
         * Method to check if the given element is focusable.
         *
         * @return void
         */
        isFocusable(element) {
            const nodes = this.queryFocusable();

            for(let i in nodes) {
                if(element === nodes[i]) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Toggle the dropdown menu
         *
         * @return void
         */
        toggle(e) {
            !this.isDropdownShowing ? this.show() : this.hide();

            e.preventDefault();
        },

        /**
         * Show the dropdown menu
         *
         * @return void
         */
        show() {
            this.isDropdownShowing = true;

            const target = this.$refs.split || this.$refs.button.$el;

            // Hack for popper for align="right"
            this.$refs.menu.$el.style.left = 'auto';
            this.$refs.menu.$el.style.right = 'auto';

            if(!this.popper) {
                this.popper = createPopper(target, this.$refs.menu.$el, {
                    placement: `${this.placement}-${this.align === 'left' ? 'start' : 'end'}`,
                    onFirstUpdate: () => {
                        this.triggerAnimation = this.animated;
                    },
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 4],
                            },
                        },
                    ]
                });
            }
            else {
                this.popper.update();
            }
            
            this.$emit('show');
            this.$emit('toggle', this.isDropdownShowing);
        },

        /**
         * Hide the dropdown menu
         *
         * @return void
         */
        hide() {
            this.isDropdownShowing = false;
            
            this.$emit('hide');
            this.$emit('toggle', this.isDropdownShowing);
        },

        /**
         * A callback function for the `blur-item` event.
         *
         * @return void
         */
        onBlurItem(e) {
            if(!this.$el.contains(e.relatedTarget)) {
                this.hide();
            }
        },

        /**
         * A callback function for the `click-item` event.
         *
         * @return void
         */
        onClickItem(e) {
            if(!this.isFocusable(e.target)) {
                this.hide();
            }
        }

    }

};