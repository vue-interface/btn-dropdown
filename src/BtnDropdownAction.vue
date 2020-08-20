<template>
    <component
        :is="is"
        :id="id"
        v-bind="to ? { to } : { href }"
        aria-haspopup="true"
        :aria-expanded="expanded"
        :type="is === 'button' ? 'button': undefined">
        <slot />
    </component>
</template>

<script>
export default {
    props: {
        expanded: {
            type: Boolean,
            default: false
        },
        id: String,
        href: String,
        to: [String, Object]
    },
    computed: {
        is() {
            if(this.to) {
                return 'router-link';
            }

            if(this.href) {
                return 'a';
            }

            return 'button';
        },
    }
};
</script>