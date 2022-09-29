<template>
    <btn-group :class="classes" class="btn-dropdown-split" @click="onClick">
        <slot v-if="!dropleft" name="button" v-bind="scope">
            <btn-dropdown-action
                v-if="!dropleft"
                :id="$attrs.id"
                ref="button"
                :expanded="expanded"
                :href="href"
                :to="to"
                :class="actionClasses"
                @click.native="e => $emit('click', e)">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </btn-dropdown-action>
        </slot>

        <btn-group ref="split">
            <slot name="split" v-bind="scope">
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
                @click-item="onClickItem"
                @blur-item="onBlur">
                <slot />
            </dropdown-menu>
        </btn-group>
        <slot v-if="dropleft" name="button" v-bind="scope">
            <btn-dropdown-action
                v-if="dropleft"
                :id="$attrs.id"
                ref="button"
                :expanded="expanded"
                :href="href"
                :to="to"
                :class="actionClasses"
                @click.native="e => $emit('click', e)">
                <slot name="icon" />
                <slot name="label">
                    {{ label }}
                </slot>
            </btn-dropdown-action>
        </slot>
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