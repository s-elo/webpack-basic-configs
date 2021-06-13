/**
 * There are three types of spliting the code
 * 1. single entry => multiple entry
 * 2. multiple entry with common files
 *    the common files (if they import the same) and 
 *    files of node_modules (even for single entry)
 *    will be bundled independently using config below:
 *    optimization: {
 *      splitChunks: {
 *          chunks: 'all'
 *      }
 *    }
 * 3. config at entry js file (single entry)
 *     using asyn import:
 *     import('./test.js')
 *         .then(({ mul, sub }) => {
 *         })
 *         .catch(() => {
 *         })
 * 
 * So usually we combine the second one and third one
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // single type (output one bundled file)
    entry: './src/js/index.js',

    // multiple type (ouput multiple bundled files)
    // entry: {
    //     index: './src/js/index.js',
    //     test: './src/js/test.js'
    // },

    output: {
        // [name]: main is default
        filename: 'js/[name].[contenthash:10].js',

        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    mode: 'production',

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
