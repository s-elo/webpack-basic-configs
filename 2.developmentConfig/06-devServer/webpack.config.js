/**
 * using the plugin to pack the html files
 * download the html-webpack-plugin at nodeJS
 */

const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',

        path: resolve(__dirname, 'build'),

        // publicPath: './'
    },

    module: {
        rules: [
            // less config
            {
                test:  /\.less$/,

                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // css
            {
                test:  /\.css$/,

                use: ['style-loader', 'css-loader']
            },

            // url config
            {
                test: /\.jpg|png|gif|jpeg$/,

                // when use only one loader
                // need to download url-loader and file-loader
                loader: 'url-loader',

                options: {
                    /**
                     * limit: X*1024 means 
                     * when the img is bigger than 8kb
                     * it will be encoded as base64 string
                     */
                    limit: 8 * 1024,

                    /**
                     * Problem1:
                     * now we can only handle the img in this way
                     * and cannot handle the img in HTML file
                     * such that: <img src="xxx">
                     * Thus we need to add one more loader below
                     * 
                     * Probem2:
                     * url-loader follows the es6 module standard
                     * while html-loader use the commonJS
                     * this leads to the error: [object Module]
                     * 
                     * Thus we need to add some configs at this loader
                     * to cancel the es6 module standard at this loader
                     */

                    esModule: false,

                    // rename the bundled imgs
                    /**
                     * [hash:x] only get the first x chars of the hash
                     * [ext] the original extended name of the img
                     */
                    name: '[hash:10].[ext]'
                }
            },

            // other resources configs
            {
                exclude: /\.html|js|css|less/,

                loader: 'file-loader',

                options: {
                    name: '[hash:10].[ext]'
                }
            },

            // html img config
            {
                test: /\.html$/,

                // Donot forget to download
                // it is used to handle the img in html files
                // follow the commonJS standard
                // loader: 'html-withimg-loader'
                loader: 'html-withimg-loader'
            }
        ]
    },

    plugins: [
        // handle the html resource
        new HtmlWebpackPlugin({
            /**
             * 1. copy the content of index.html 
             * 2. automatically import the JS,CSS or other resource at index.js
             */
            template: './src/index.html'
        })
    ],

    mode: 'development',

    // devServer configs
    // note that it will only compile at the memory
    // without really pack the files in src
    // which means the changes will be updated only when the server opening
    // and the contents are not really output or bundleds
    devServer: {
        contentBase: resolve(__dirname, 'build'),

        // gzip compression
        compress: true,

        port: 3000,

        // automatically open the browser
        open: true
    }
}
