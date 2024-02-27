<script setup lang="ts">
import { BtnGroup } from '@vue-interface/btn-group';
import { DropdownMenu } from '@vue-interface/dropdown-menu';
import BtnDropdownAction from './BtnDropdownAction.vue';
import { BtnDropdownEmits, BtnDropdownProps, useBtnDropdown } from './dropdown.js';

const props = defineProps<BtnDropdownProps>();
const emit = defineEmits<BtnDropdownEmits>();

const {
    button,
    $button,
    target,
    classes,
    expanded,
    menu,
    toggleClasses,
    triggerAnimation,
    toggle,
    onBlur,
    onClickToggle,
    onClickItem,
    onKeydown
} = useBtnDropdown(props, emit);
</script>

<template>
    <BtnGroup
        ref="target"
        :class="classes">
        <slot
            name="button"
            v-bind="{ button, $button, expanded, target, toggle, onBlur, onClickToggle, onClickItem, onKeydown }">
            <BtnDropdownAction
                :id="($attrs.id as string)"
                ref="button"
                :expanded="expanded"
                :class="toggleClasses"
                @blur="onBlur"
                @click="onClickToggle">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </BtnDropdownAction>
        </slot>
        <DropdownMenu
            :id="$attrs.id"
            ref="menu"
            :align="align"
            :show="expanded"
            :class="{animated: triggerAnimation}"
            @blur="onBlur"
            @click="onClickItem"
            @keydown.tab="onKeydown"
            @mousedown.prevent="">
            <slot />
        </DropdownMenu>
    </BtnGroup>
</template>