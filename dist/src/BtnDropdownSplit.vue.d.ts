declare const _sfc_main: import("vue").DefineComponent<{}, {}, {}, {}, {}, {
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
            sizeableClassPrefix(): string | undefined;
            hasSizeablePrefix(): boolean;
            sizeableClass(): string;
        }, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            componentPrefix: StringConstructor;
            size: StringConstructor;
            sizePrefix: StringConstructor;
        }>>, {}>, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            sizePrefix: {
                type: StringConstructor;
                default(): string;
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
        align: {
            type: StringConstructor;
            default: string;
            validate(value: any): boolean;
        };
        animated: {
            type: BooleanConstructor;
            default: boolean;
        };
        buttonClass: (StringConstructor | ObjectConstructor)[];
        caret: {
            type: BooleanConstructor;
            default: boolean;
        };
        dropup: {
            type: BooleanConstructor;
            default: boolean;
        };
        dropright: {
            type: BooleanConstructor;
            default: boolean;
        };
        dropleft: {
            type: BooleanConstructor;
            default: boolean;
        };
        height: StringConstructor;
        href: StringConstructor;
        nav: BooleanConstructor;
        label: StringConstructor;
        offset: {
            type: NumberConstructor;
            default: number;
        };
        rotate: {
            type: BooleanConstructor;
            default: boolean;
        };
        split: {
            type: BooleanConstructor;
            default: boolean;
        };
        to: (StringConstructor | ObjectConstructor)[];
        type: {
            type: StringConstructor;
            default: string;
        };
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
        focus(): void;
        queryFocusable(): any;
        isFocusable(element: any): boolean;
        toggle(): void;
        show(): void;
        hide(): void;
        onBlur(e: any): void;
        onClickDocument(e: Event): void;
        onClickItem(e: any): void;
        onClickToggle(e: any): void;
        onKeydown(e: any): void;
    };
    watch: {
        expanded(value: any): void;
    };
}, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
