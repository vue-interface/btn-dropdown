declare const _sfc_main: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").DefineComponent<{
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
}, unknown, {
    popper: null;
    triggerAnimation: boolean;
    expanded: boolean;
}, {
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
    sizeableClassPrefix(): "btn";
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
}, {
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
}, import("vue").ComponentOptionsMixin, import("vue").DefineComponent<{
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
}>>, {}> | {
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
    componentPrefix: string;
    active: boolean;
    block: boolean;
    disabled: boolean;
    outline: boolean;
    variant: string;
}>, ("toggle" | "show" | "click-toggle" | "hide")[], "toggle" | "show" | "click-toggle" | "hide", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & {
    onToggle?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    "onClick-toggle"?: ((...args: any[]) => any) | undefined;
    onHide?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    split: boolean;
    align: string;
    animated: boolean;
    caret: boolean;
    dropup: boolean;
    dropright: boolean;
    dropleft: boolean;
    nav: boolean;
    offset: number;
    rotate: boolean;
}>, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _sfc_main;
