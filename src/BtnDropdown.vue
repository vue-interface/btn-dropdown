<script setup lang="ts">
import { useSlots } from 'vue';
import BtnDropdownSingle from './BtnDropdownSingle.vue';
import BtnDropdownSplit from './BtnDropdownSplit.vue';
import { BtnDropdownProps } from './dropdown.js';

const props = defineProps<BtnDropdownProps>();

const emit = defineEmits<{
    click: [e: Event]
}>();

const slots = useSlots();
</script>

<template>
    <Component
        :is="split ? BtnDropdownSplit : BtnDropdownSingle"
        v-bind="props"
        class="btn-dropdown"
        @click="(e: Event) => emit('click', e)">
        <!-- @click-toggle="(...args: any[]) => $emit('click-toggle', ...args)"
        @dropdown="(...args: any[]) => $emit('dropdown', ...args)"
        @show="(...args: any[]) => $emit('show', ...args)"
        @hide="(...args: any[]) => $emit('hide', ...args)"
        @toggle="(...args: any[]) => $emit('toggle', ...args)" -->
        <template #icon>
            <slot name="icon" />
        </template>
        <template
            v-if="label || slots.label"
            #label>
            <slot name="label">
                {{ label }}
            </slot>
        </template>
        <template #button="slot">
            <slot
                name="button"
                v-bind="slot" />
        </template>
        <template #split="slot">
            <slot
                name="split"
                v-bind="slot" />
        </template>
        <slot />
    </Component>
</template>