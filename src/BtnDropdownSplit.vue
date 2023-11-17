<script setup lang="ts">
import { BtnGroup } from '@vue-interface/btn-group';
import { DropdownMenu } from '@vue-interface/dropdown-menu';
import BtnDropdownAction from './BtnDropdownAction.vue';
import { BtnDropdownEmits, BtnDropdownProps, useBtnDropdown } from './dropdown.js';

const props = defineProps<BtnDropdownProps>();
const emit = defineEmits<BtnDropdownEmits>();

const {
    actionClasses,
    classes,
    expanded,
    menu,
    target,
    toggleClasses,
    triggerAnimation,
    onBlur,
    onClickToggle,
    onClickItem,
    onKeydown
} = useBtnDropdown(props, emit);
</script>

<template>
    <BtnGroup
        :class="classes"
        class="btn-dropdown-split">
        <slot
            v-if="!dropleft"
            v-bind="{ expanded, onBlur, onClickToggle, onClickItem, onKeydown }"
            name="button">
            <BtnDropdownAction
                :id="($attrs.id as string)"
                :expanded="expanded"
                :class="actionClasses"
                @click="emit('click', $event)">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </BtnDropdownAction>
        </slot>
   
        <BtnGroup ref="target">
            <slot
                name="split">
                <button
                    :id="($attrs.id as string)"
                    type="button"
                    aria-haspopup="true"
                    :aria-expanded="expanded"
                    :class="toggleClasses"
                    @blur="onBlur"
                    @click="onClickToggle" />
            </slot>
            
            <DropdownMenu
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

        <slot
            v-if="dropleft"
            v-bind="{ expanded, onBlur, onClickToggle, onClickItem, onKeydown }"
            name="button">
            <BtnDropdownAction
                :id="($attrs.id as string)"
                :expanded="expanded"
                :class="actionClasses"
                @click="emit('click', $event)">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </BtnDropdownAction>
        </slot>
    </BtnGroup>
</template>