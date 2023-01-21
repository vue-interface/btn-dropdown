<script lang="ts">
import { defineComponent } from 'vue';
import DropdownHandler from './DropdownHandler';

export default defineComponent({

    mixins: [
        DropdownHandler
    ],

    emits: [
        'click'
    ]

});
</script>

<template>
    <btn-group
        :class="classes"
        class="btn-dropdown-split">
        <slot
            v-if="!dropleft"
            name="button"
            v-bind="scope">
            <btn-dropdown-action
                v-if="!dropleft"
                :id="$attrs.id"
                ref="button"
                :expanded="expanded"
                :href="href"
                :to="to"
                :class="actionClasses"
                @click="$emit('click', $event)">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </btn-dropdown-action>
        </slot>

        <btn-group ref="split">
            <slot
                name="split"
                v-bind="scope">
                <button
                    v-if="split"
                    :id="$attrs.id"
                    type="button"
                    aria-haspopup="true"
                    :aria-expanded="expanded"
                    :class="toggleClasses"
                    @blur="onBlur"
                    @click="onClickToggle" />
            </slot>
            
            <dropdown-menu
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
            </dropdown-menu>
        </btn-group>
        <slot
            v-if="dropleft"
            name="button"
            v-bind="scope">
            <btn-dropdown-action
                v-if="dropleft"
                :id="$attrs.id"
                ref="button"
                :expanded="expanded"
                :href="href"
                :to="to"
                :class="actionClasses"
                @click="$emit('click', $event)">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </btn-dropdown-action>
        </slot>
    </btn-group>
</template>