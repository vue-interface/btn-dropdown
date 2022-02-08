<template>
    <btn-group :class="classes">
        <slot name="button" v-bind="this">
            <btn-dropdown-action
                :id="$attrs.id"
                ref="button"
                :expanded="expanded"
                :href="href"
                :to="to"
                :style="toggleStyle"
                :class="toggleClasses"
                @blur.native="onBlur"
                @click.native="onClickToggle">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </btn-dropdown-action>
        </slot>
        <dropdown-menu
            :id="$attrs.id"
            ref="menu"
            :align="align"
            :show="expanded"
            :class="{animated: triggerAnimation}"
            @blur-item="onBlur"
            @click-item="onClickItem">
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