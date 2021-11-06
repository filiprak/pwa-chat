process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    pwa: {
        name: 'pwa-chat',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './dist-sw/sw.js',
        },
    },
};
