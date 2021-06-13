/**
 * mini-css-extract-plugin
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',

    output: {
        filename: 'js/bundled.js',

        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            {
                test: /\.css$/,

                use: [
                    /**
                     * since using the mini-css-extract-plugin
                     * we use the loader of its instance 
                     * instead of the 'style-loader'
                     */
                    MiniCssExtractPlugin.loader,

                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'css/bundled.css'
        })
    ],

    mode: 'development'
};
