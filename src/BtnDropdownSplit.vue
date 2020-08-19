<template>
    <btn-group :class="{'dropdown': dropup && dropright && dropleft, 'dropup': dropup, 'dropright': dropright, 'dropleft': dropleft}" @click="onClick">
        <btn-dropdown-action
            v-if="!dropleft"
            :id="$attrs.id"
            ref="button"
            :expanded="isDropdownShowing"
            :href="href"
            :class="actionClasses">
            <slot name="icon" />
            <slot name="label">
                {{ label }}
            </slot>
        </btn-dropdown-action>
        <btn-group>
            <button
                v-if="split"
                :id="$attrs.id"
                ref="split"
                type="button"
                aria-haspopup="true"
                :aria-expanded="isDropdownShowing"
                :class="toggleClasses"
                @click.prevent="toggle"
                @blur="onBlur" />
            
            <dropdown-menu
                :id="$attrs.id"
                ref="menu"
                :align="align"
                :show="isDropdownShowing">
                <slot />
            </dropdown-menu>
        </btn-group>
        <btn-dropdown-action
            v-if="dropleft"
            :id="$attrs.id"
            ref="button"
            :expanded="isDropdownShowing"
            :href="href"
            :class="actionClasses">
            <slot name="icon" />
            <slot name="label">
                {{ label }}
            </slot>
        </btn-dropdown-action>
    </btn-group>
</template>

<script>
import DropdownHandler from './DropdownHandler';

export default {

    name: 'BtnDropdown',
    
    mixins: [
        DropdownHandler
    ]

};
</script>