declare const _sfc_main: import("vue").DefineComponent<{
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
export default _sfc_main;
