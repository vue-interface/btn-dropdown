<template>
    <component
        :is="$attrs.split ? 'btn-dropdown-split' : 'btn-dropdown-single'"
        class="btn-dropdown"
        v-bind="$attrs">
        <template #icon>
            <slot name="icon" />
        </template>
        <template #label>
            <slot name="label">
                {{ $attrs.label }}
            </slot>
        </template>
        <slot />
    </component>
</template>

<script>
import BtnDropdownSplit from './BtnDropdownSplit';
import BtnDropdownSingle from './BtnDropdownSingle';

export default {

    name: 'BtnDropdown',

    components: {
        BtnDropdownSplit,
        BtnDropdownSingle
    },

    inheritAttrs: false

};
</script>

<style>
@keyframes btnDropdownZoomIn {
    from {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
        opacity: 1;
    }
}
  
.btn-dropdown .dropdown-menu {
    animation-duration: 125ms;
    animation-fill-mode: both;
    -webkit-font-smooth: subpixel-antialiased;
}

.btn-dropdown .dropdown-menu.animated {
    animation-name: btnDropdownZoomIn;
}
</style>