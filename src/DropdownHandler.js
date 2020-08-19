import BtnDropdownAction from './BtnDropdownAction';
import { createPopper } from '@popperjs/core';
import Btn from '@vue-interface/btn';
import { BtnGroup } from '@vue-interface/btn-group';
import DropdownMenu from '@vue-interface/dropdown-menu';
import { prefix } from '@vue-interface/utils';

const TAB_KEYCODE = 9;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

let ignoreBlurEvent = false;

export default {

    components: {
        BtnDropdownAction,
        BtnGroup,
        DropdownMenu
    },

    extends: Btn,

    props: {

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

    watch: {
        isDropdownShowing(value) {
            const target = this.$refs.split || this.$refs.button.$el;

            // Hack for popper for align="right"
            this.$refs.menu.$el.style.left = 'auto';
            this.$refs.menu.$el.style.right = 'auto';

            createPopper(target, this.$refs.menu.$el, {
                placement: `${this.placement}-${this.align === 'left' ? 'start' : 'end'}`,
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
    },

    mounted() {
        this.$el.querySelectorAll('[type=submit], input, select, textarea, [tabindex]:not([tabindex="-1"]')
            .forEach(el => {
                if(el && el.addEventListener) {
                    el.addEventListener('blur', event => {
                        if(!ignoreBlurEvent) {
                            this.focus();
                        }

                        ignoreBlurEvent = false;
                    });

                    el.addEventListener('focus', event => {
                        ignoreBlurEvent = false;
                    });

                    el.addEventListener('keydown', event => {
                        const ignore = [
                            LEFT_ARROW_KEYCODE,
                            RIGHT_ARROW_KEYCODE,
                            UP_ARROW_KEYCODE,
                            DOWN_ARROW_KEYCODE,
                            TAB_KEYCODE
                        ];

                        if(ignore.indexOf(event.keyCode) !== -1) {
                            ignoreBlurEvent = true;
                        }
                    });

                    el.addEventListener('mousedown', event => {
                        ignoreBlurEvent = true;
                    });
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
         * A callback function for the `click` event for the action button
         *
         * @return void
         */
        onClick(event) {
            this.hide();
            this.$emit('click', event);
        },

        /**
         * A callback function for the `blur` event for the action button
         *
         * @return void
         */
        onBlur(event) {
            if(!this.$el.contains(event.relatedTarget)) {
                this.hide();
            }
        },

        /**
         * A callback function for the `item:click` event for the action button
         *
         * @return void
        onItemClick(event, item) {
            if(!this.isFocusable(event.target)) {
                this.hide();
            }

            this.$emit('item:click', event, item);
        }
        */

    }

};