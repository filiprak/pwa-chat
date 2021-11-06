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
