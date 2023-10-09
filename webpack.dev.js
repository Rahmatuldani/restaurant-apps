const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9000,
        open: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        compress: true,
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
