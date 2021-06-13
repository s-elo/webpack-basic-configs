/**
 * JsCompatibility: babel-loader && @babel/core (these two are must)
 *  1. handle basic compatibilities: @babel/preset-env
 *      problem: only handle some basic syntax compatibilitues
 *               such that it cannot handle the Promise
 *  2. handle all the compatibiliies: @babel/polyfill
 *      (using import @babel/polyfill in JS file)
 *      problem: when we only need to handle some of the compatibilies
 *               it is too big
 *  3. handle the compatibilies we need: core-js
 *      when using this, we cannot use the second method
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',

    output: {
        filename: 'js/bundled.js',

        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            // {
            //     test: /\.js$/,

            //     exclude: /node_modules/,

            //     loader: 'eslint-loader',

            //     options: {
            //         // auto fix the inappropriate syntax
            //         fix: true
            //     }
            // },

            {
                test: /\.js$/,

                exclude: /node_modules/,

                loader: 'babel-loader',

                options: {
                    // tell the babel how to do
                    presets: [
                        [
                            '@babel/preset-env',

                            // set what we need to compate
                            {
                                useBuiltIns: 'usage',

                                // tell the version of the core-js
                                corejs: {
                                    version: 3
                                },

                                // to which versions of the browsers
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    mode: 'development'
};
