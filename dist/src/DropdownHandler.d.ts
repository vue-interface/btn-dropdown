declare const _default: {
    components: {
        BtnDropdownAction: import("vue").DefineComponent<{
            expanded: {
                type: BooleanConstructor;
                default: boolean;
            };
            id: {
                type: StringConstructor;
                default: undefined;
            };
            href: {
                type: StringConstructor;
                default: undefined;
            };
            to: {
                type: (StringConstructor | ObjectConstructor)[];
                default: undefined;
            };
        }, unknown, unknown, {
            is(): "button" | "router-link" | "a";
        }, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            expanded: {
                type: BooleanConstructor;
                default: boolean;
            };
            id: {
                type: StringConstructor;
                default: undefined;
            };
            href: {
                type: StringConstructor;
                default: undefined;
            };
            to: {
                type: (StringConstructor | ObjectConstructor)[];
                default: undefined;
            };
        }>>, {
            expanded: boolean;
            id: string;
            href: string;
            to: string | Record<string, any>;
        }>;
        BtnGroup: import("vue").DefineComponent<{
            sizePrefix: {
                type: StringConstructor;
                default(): string;
            };
            toggle: BooleanConstructor;
            vertical: BooleanConstructor;
        }, unknown, unknown, {
            classes(): {
                [x: number]: boolean;
                'btn-group': boolean;
                'btn-group-toggle': any;
                'btn-group-vertical': any;
            };
        }, {}, import("vue").DefineComponent<{
            componentPrefix: StringConstructor;
            size: StringConstructor;
            sizePrefix: StringConstructor;
        }, unknown, unknown, {
            sizeableClassPrefix(): string | undefined; /**
             * Should animate the dropdown opening.
             *
             * @property {Boolean}
             */
            hasSizeablePrefix(): boolean;
            sizeableClass(): string;
        }, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            componentPrefix: StringConstructor;
            size: StringConstructor;
            sizePrefix: StringConstructor;
        }>>, {}>, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            sizePrefix: {
                type: StringConstructor;
                default(): string; /**
                 * Display as a dropup instead of a dropdown.
                 *
                 * @property Boolean
                 */
            };
            toggle: BooleanConstructor;
            vertical: BooleanConstructor;
        }>>, {
            sizePrefix: string;
            toggle: boolean;
            vertical: boolean;
        }>;
        DropdownMenu: import("vue").DefineComponent<{
            align: {
                type: StringConstructor;
                default: string;
                validate(value: any): boolean;
            };
            show: BooleanConstructor;
        }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            align: {
                type: StringConstructor;
                default: string;
                validate(value: any): boolean;
            };
            show: BooleanConstructor;
        }>>, {
            align: string;
            show: boolean;
        }>;
    };
    extends: import("vue").DefineComponent<{
        active: BooleanConstructor;
        block: BooleanConstructor;
        componentPrefix: {
            type: StringConstructor;
            default: string;
        };
        disabled: BooleanConstructor;
        label: StringConstructor;
        outline: BooleanConstructor;
        tag: StringConstructor;
        variant: {
            type: StringConstructor;
            default: string;
        };
    }, unknown, unknown, {
        classes(): string | undefined[];
        component(): string;
        variantClassPrefix(): string;
    }, {}, {
        props: {
            componentPrefix: StringConstructor;
            size: StringConstructor;
            sizePrefix: StringConstructor;
        };
        computed: {
            sizeableClassPrefix(): string | undefined;
            hasSizeablePrefix(): boolean;
            sizeableClass(): string;
        };
    } | {
        props: {
            componentPrefix: StringConstructor;
            /**
             * Display as a dropup instead of a dropdown.
             *
             * @property Boolean
             */
            variant: StringConstructor;
            variantPrefix: StringConstructor;
        };
        computed: {
            variantClassPrefix(): string | undefined;
            hasVariantPrefix(): boolean;
            variantClass(): string;
        };
    }, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        active: BooleanConstructor;
        block: BooleanConstructor;
        componentPrefix: {
            type: StringConstructor;
            default: string;
        };
        disabled: BooleanConstructor;
        label: StringConstructor;
        outline: BooleanConstructor;
        tag: StringConstructor;
        variant: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        active: boolean;
        block: boolean;
        componentPrefix: string;
        disabled: boolean;
        outline: boolean;
        variant: string;
    }>;
    emits: string[];
    props: {
        /**
         * Display the dropdown menu aligned left or right
         *
         * @property String
         */
        align: {
            type: StringConstructor;
            default: string;
            validate(value: any): boolean;
        };
        /**
         * Should animate the dropdown opening.
         *
         * @property {Boolean}
         */
        animated: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * Additional button classes.
         *
         * @property {Object|String}
         */
        buttonClass: (StringConstructor | ObjectConstructor)[];
        /**
         * Show the caret.
         *
         * @property {Boolean}
         */
        caret: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * Should display the toggle button as a circle.
         *
         * @property Boolean
         */
        /**
         * Display as a dropup instead of a dropdown.
         *
         * @property Boolean
         */
        dropup: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * Display as a dropright instead of a dropdown.
         *
         * @property Boolean
         */
        dropright: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * Display as a dropleft instead of a dropdown.
         *
         * @property Boolean
         */
        dropleft: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * The action height.
         *
         * @property {String}
         */
        height: StringConstructor;
        /**
         * The href action.
         *
         * @property {String}
         */
        href: StringConstructor;
        /**
         * Is the dropdown a nav item?
         *
         * @property {Boolean}
         */
        nav: BooleanConstructor;
        /**
         * The toggle button's label. If not defined as an attribute,
         * you can override with the component's slot (inner html).
         *
         * @property {String}
         */
        label: StringConstructor;
        offset: {
            type: NumberConstructor;
            default: number;
        };
        /**
         * Should rotate the toggle button when opened.
         *
         * @property {Boolean}
         */
        rotate: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * Display the dropdown button with a split toggle button.
         *
         * @property {Boolean}
         */
        split: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * The "to" path, used for vue-router.
         *
         * @property {String|Object}
         */
        to: (StringConstructor | ObjectConstructor)[];
        /**
         * The button type attribute.
         *
         * @property {String}
         */
        type: {
            type: StringConstructor;
            default: string;
        };
        /**
         * The action width.
         *
         * @property {String}
         */
        width: StringConstructor;
    };
    data(): {
        popper: null;
        triggerAnimation: boolean;
        expanded: boolean;
    };
    computed: {
        scope(): {
            placement: any;
            variantClassPrefix: any;
            sizeableClassPrefix: any;
            classes: any;
            actionClasses: any;
            toggleStyle: any;
            toggleClasses: any;
            focus: any;
            queryFocusable: any;
            isFocusable: any;
            toggle: any;
            show: any;
            hide: any;
            onBlur: any;
            onClickItem: any;
            onClickToggle: any;
            expanded: any;
        };
        placement(): "left" | "right" | "top" | "bottom";
        variantClassPrefix(): string;
        sizeableClassPrefix(): string;
        classes(): {
            dropdown: any;
            dropup: any;
            dropright: any;
            dropleft: any;
            'icon-only': boolean;
            'hide-caret': boolean;
            expanded: any;
            'rotate-90': any;
        };
        actionClasses(): any;
        toggleStyle(): {
            width: any;
            height: any;
        };
        toggleClasses(): any;
    };
    beforeUnmount(): void;
    methods: {
        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        focus(): void;
        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        queryFocusable(): any;
        /**
         * Method to check if the given element is focusable.
         *
         * @return void
         */
        isFocusable(element: any): boolean;
        /**
         * Toggle the dropdown menu
         *
         * @return void
         */
        toggle(): void;
        /**
         * Show the dropdown menu
         *
         * @return void
         */
        show(): void;
        /**
         * Hide the dropdown menu
         *
         * @return void
         */
        hide(): void;
        /**
         * A callback function for the `blur-item` event.
         *
         * @return void
         */
        onBlur(e: any): void;
        onClickDocument(e: Event): void;
        /**
         * A callback function for the `click-item` event.
         *
         * @return void
         */
        onClickItem(e: any): void;
        /**
         * A callback function for the `click-toggle` event.
         *
         * @return void
         */
        onClickToggle(e: any): void;
        onKeydown(e: any): void;
    };
    watch: {
        expanded(value: any): void;
    };
};
export default _default;
