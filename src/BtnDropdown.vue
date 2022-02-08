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
        <template #button="slot">
            <slot name="button" v-bind="slot" />
        </template>
        <template #split="slot">
            <slot name="split" v-bind="slot" />
        </template>
        <slot />
    </component>
</template>

<script>
import BtnDropdownSplit from './BtnDropdownSplit.vue';
import BtnDropdownSingle from './BtnDropdownSingle.vue';

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
    }

    to {
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
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
}

.btn-dropdown.rounded-circle > .btn:first-child,
.btn-dropdown.rounded-circle > .btn-group:first-child .dropdown-toggle {
    border-top-left-radius: 100%;
    border-bottom-left-radius: 100%;
}

.btn-dropdown .rounded-circle {
    border-radius: 100%;
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
    animation-timing-function: ease-in-out;
    animation-duration: 200ms;
    animation-fill-mode: both;
}

.btn-dropdown .dropdown-menu.animated {
    animation-name: btnDropdownZoomIn;
}
</style>