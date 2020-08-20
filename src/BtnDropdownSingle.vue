<template>
    <btn-group :class="classes">
        <btn-dropdown-action
            :id="$attrs.id"
            ref="button"
            :expanded="isDropdownShowing"
            :href="href"
            :to="to"
            :style="toggleStyle"
            :class="toggleClasses"
            @click.native="onClickToggle">
            <slot name="icon" />
            <slot name="label">
                {{ label }}
            </slot>
        </btn-dropdown-action>
        <dropdown-menu
            :id="$attrs.id"
            ref="menu"
            :align="align"
            :show="isDropdownShowing"
            :class="{animated: triggerAnimation}"
            @click-item="onClickItem"
            @blur-item="onBlurItem">
            <slot />
        </dropdown-menu>
    </btn-group>
</template>

<script>
import DropdownHandler from './DropdownHandler';

export default {

    mixins: [
        DropdownHandler
    ]

};
</script>