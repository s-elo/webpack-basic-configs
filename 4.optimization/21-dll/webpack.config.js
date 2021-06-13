/**
 * dll && externals:
 * dll: only bundle the libs once at local resource
 * externals: not bundle at all, using online resource
 */

const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const Webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

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
        }),

        // tell webpack which libs no need to be bundled
        // also the names need to be changed
        new Webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),

        // bundle the file and output
        // Html file will introduce the file as well
        // or you can add the file src manually
        // problem: 
        //  the introduced src will add a auto/jquery.js(no idea..)
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],

    mode: 'production'
}
