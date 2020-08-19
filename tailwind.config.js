const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: false,
    corePlugins: {
        container: false,
    },
    plugins: [
        require('@vue-interface/dropdown-menu/tailwindcss'),
        require('@vue-interface/btn/tailwindcss'),
        require('@vue-interface/btn-group/tailwindcss'),
    ]
};