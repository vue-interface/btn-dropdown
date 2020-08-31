<template>
    <btn-group :class="classes" class="btn-dropdown-split" @click="onClick">
        <btn-dropdown-action
            v-if="!dropleft"
            :id="$attrs.id"
            ref="button"
            :expanded="isDropdownShowing"
            :href="href"
            :to="to"
            :class="actionClasses"
            @click.native="e => $emit('click', e)">
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
                @click="onClickToggle" />
            
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
        <btn-dropdown-action
            v-if="dropleft"
            :id="$attrs.id"
            ref="button"
            :expanded="isDropdownShowing"
            :href="href"
            :to="to"
            :class="actionClasses"
            @click.native="e => $emit('click', e)">
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

    mixins: [
        DropdownHandler
    ]

};
</script>