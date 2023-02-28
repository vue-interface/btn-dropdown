declare const _default: import("vue").DefineComponent<{
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
    /**
     * The toggle button's label. If not defined as an attribute,
     * you can override with the component's slot (inner html).
     *
     * @property {String}
     */
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
    outline: boolean; /**
     * Display the dropdown button with a split toggle button.
     *
     * @property {Boolean}
     */
    variant: string;
}>, ("toggle" | "show" | "click-toggle" | "hide")[], "toggle" | "show" | "click-toggle" | "hide", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>;
export default _default;
