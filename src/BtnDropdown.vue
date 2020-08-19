<template>
    <btn-dropdown-split v-if="split" v-bind="$options.propsData">
        <template #icon>
            <slot name="icon" />
        </template>
        <template #label>
            <slot name="label">
                {{ label }}
            </slot>
        </template>
        <slot />
    </btn-dropdown-split>
    <btn-group v-else :class="{'dropdown': dropup && dropright && dropleft, 'dropup': dropup, 'dropright': dropright, 'dropleft': dropleft}" @click="onClick">
        <btn-dropdown-action
            :id="$attrs.id"
            ref="button"
            :expanded="isDropdownShowing"
            :href="href"
            :class="toggleClasses"
            @click.native="toggle">
            <slot name="icon" />
            <slot name="label">
                {{ label }}
            </slot>
        </btn-dropdown-action>
        <dropdown-menu
            :id="$attrs.id"
            ref="menu"
            :align="align"
            :show="isDropdownShowing">
            <slot />
        </dropdown-menu>
    </btn-group>
</template>

<script>
import BtnDropdownSplit from './BtnDropdownSplit';
import DropdownHandler from './DropdownHandler';

export default {

    name: 'BtnDropdown',

    components: {
        BtnDropdownSplit
    },
    
    mixins: [
        DropdownHandler
    ]

};
</script>
