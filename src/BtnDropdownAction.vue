<template>
    <component
        :is="href ? 'a' : 'button'"
        :id="id"
        aria-haspopup="true"
        :aria-expanded="expanded">
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
        href: String
    }
};
</script>