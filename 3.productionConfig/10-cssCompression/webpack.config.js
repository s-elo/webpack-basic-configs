/**
 * using the plugin: optimize-css-assets-webpack-plugin
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'development';

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

                    'css-loader',

                    {
                        loader: 'postcss-loader',

                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            ident: "postcss"
                                        },
                                    ],
                                ],
                            }
                        }
                    }
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
        }),

        new OptimizeCssAssetsWebpackPlugin()
    ],

    mode: 'development'
};
