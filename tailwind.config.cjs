const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './index.html'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/dropdown-menu/tailwindcss'),
        require('@vue-interface/btn/tailwindcss'),
        require('@vue-interface/btn-group/tailwindcss'),
    ],
    safelist: [
        ...require('@vue-interface/btn/tailwindcss/safelist')(),
        ...require('@vue-interface/btn-group/tailwindcss/safelist')(),
        ...require('@vue-interface/dropdown-menu/tailwindcss/safelist')(),
    ]
};