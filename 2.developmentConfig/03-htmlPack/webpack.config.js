/**
 * using the plugin to pack the html files
 * download the html-webpack-plugin at nodeJS
 */

const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'built.js',

        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            /**
             * 1. copy the content of index.html 
             * 2. automatically import the JS,CSS or other resource
             */
            template: './src/index.html',

            // compress
            minify: {
                // remove space
                collapseWhitespace: true,

                // remove comments
                removeComments: true
            }
        })
    ],

    mode: 'development'
}
