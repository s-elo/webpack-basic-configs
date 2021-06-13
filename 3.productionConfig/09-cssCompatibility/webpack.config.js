/**
 * 1. using postcss --> (download) postcss-loader postcss-preset-env
 * 2. postcss-preset-env: 
 *      help postcss find the browserslist(in the package.json) to handle the compatibility with configs
 * 3. search "browserslist" in github to find more configs for compatibility
 *    for example:
 *      "browserslist": {
 *          // change the process.env.NODE_ENV = 'development'
 *          // to switch to the development mode
            "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
            ],

            // production mode is default
            "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
            ]
        }
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        })
    ],

    mode: 'development'
};
