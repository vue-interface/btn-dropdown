const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './index.html',
        './demo/**/*/.{html,vue}',
        './src/*.{vue}',
        './node_modules/@vue-interface/*/{src,tailwindcss}/*.{vue,ts,js,cjs,mjs}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/dropdown-menu/tailwindcss'),
        require('@vue-interface/btn/tailwindcss')(),
        require('@vue-interface/btn-group/tailwindcss'),
    ],
    safelist: [
        // ...require('@vue-interface/btn/tailwindcss/safelist')(),
        // ...require('@vue-interface/btn-group/tailwindcss/safelist')(),
        // ...require('@vue-interface/dropdown-menu/tailwindcss/safelist')(),
    ]
};