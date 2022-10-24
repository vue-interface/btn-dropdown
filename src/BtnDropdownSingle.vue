<script>
import DropdownHandler from './DropdownHandler';

export default {

    mixins: [
        DropdownHandler
    ]

};
</script>

<template>
    <btn-group :class="classes">
        <slot name="button" v-bind="scope">
            <btn-dropdown-action
                :id="$attrs.id"
                ref="button"
                :expanded="expanded"
                :href="href"
                :to="to"
                :style="toggleStyle"
                :class="toggleClasses"
                @blur="onBlur"
                @click="onClickToggle">
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
            @blur="onBlur"
            @click="onClickItem">
            <slot />
        </dropdown-menu>
    </btn-group>
</template>