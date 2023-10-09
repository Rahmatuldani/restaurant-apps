const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { default: ImageminWebpackPlugin } = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
            swDest: 'sw.bundle.js',
        }),

        new WebpackPwaManifest({
            filename: 'manifest.json',
            publicPath: '/',
            inject: true,

            id: 'restaurant-apps-lite-pwa-1',
            start_url: '.',
            name: 'Restaurant Apps Lite',
            short_name: 'Restaurant Lite',
            description: 'Free Catalogue Restaurant for you',
            background_color: '#ffffff',
            theme_color: '#D84315',
            crossorigin: 'use-credentials',
            fingerprints: true,
            icons: [
                {
                    src: path.resolve('src/public/icons/icon.png'),
                    sizes: [32, 64, 128, 192, 256, 512],
                    purpose: 'any',
                    type: 'image/png',
                    destination: 'assets/icons',
                },
                {
                    src: path.resolve('src/public/maskable_icon.png'),
                    size: '512x512',
                    purpose: 'maskable',
                    type: 'image/png',
                    destination: 'assets',
                },
            ],
        }),

        new ImageminWebpackPlugin({
            plugins: [
                imageminMozjpeg({
                    quality: 50,
                    progressive: true,
                }),
            ],
        }),

    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
});
