<template>
    <component
        :is="$attrs.split === undefined || !!$attrs.nav ? 'btn-dropdown-single' : 'btn-dropdown-split'"
        class="btn-dropdown"
        v-bind="$attrs"
        @click="(...args) => this.$emit('click', ...args)"
        @click-toggle="(...args) => this.$emit('click-toggle', ...args)"
        @dropdown="(...args) => this.$emit('dropdown', ...args)"
        @show="(...args) => this.$emit('show', ...args)"
        @hide="(...args) => this.$emit('hide', ...args)"
        @toggle="(...args) => this.$emit('toggle', ...args)">
        <template #icon>
            <slot name="icon" />
        </template>
        <template v-if="$attrs.label || this.$slots.label" #label>
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


.btn-dropdown {
    position: relative;
}

.btn-dropdown .dropdown-toggle {
    display: flex;
    transition: all 125ms ease-in;
    align-items: center;
    justify-content: center;
}

.nav-item .btn-group,
.nav-item .btn-dropdown .dropdown-toggle {
    display: block;
}

.btn-dropdown.rounded-circle > .btn:last-child,
.btn-dropdown.rounded-circle > .btn-group:last-child .dropdown-toggle {
    border-top-right-radius: 1000rem;
    border-bottom-right-radius: 1000rem;
}

.btn-dropdown.rounded-circle > .btn:first-child,
.btn-dropdown.rounded-circle > .btn-group:first-child .dropdown-toggle {
    border-top-left-radius: 1000rem;
    border-bottom-left-radius: 1000rem;
}

.btn-dropdown .rounded-circle {
    border-radius: 1000rem;
}

.btn-dropdown .rotate-90 {
    transform: rotate(90deg);
}
  
.btn-dropdown.hide-caret .dropdown-toggle::after,
.btn-dropdown.icon-only .dropdown-toggle::after,
.btn-dropdown.hide-caret .dropdown-toggle::before,
.btn-dropdown.icon-only .dropdown-toggle::before {
    display: none;
}

.btn-dropdown .dropdown-menu {
    animation-duration: 125ms;
    animation-fill-mode: both;
}

.btn-dropdown .dropdown-menu.animated {
    animation-name: btnDropdownZoomIn;
}
</style>