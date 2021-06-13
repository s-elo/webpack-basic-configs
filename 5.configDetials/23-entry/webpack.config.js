/**
 * entry:
 *  1. string: './src/js/index.js' (single entry)
 *      bundle as one chunk, output one bundled file;
 *      main is the default chunk name: 'js/[name].js'
 * 
 *  2. array: ['./src/js/index.js', './src/js/add.js'] (muliple)
 *      bundle as one chunk, output one bundled file;
 *      main is the default chunk name: 'js/[name].js'
 *      --> this type only have one function:
 *              when using HMR, make sure html file can be updated
 *              ['./src/js/index.js', './src/index.html']
 * 
 *  3. object: {index: './src/js/index.js', add: './src/js/add.js'}
 *     (multiple entry)
 *      X entry files as X chunks, output X bundled files
 *      chunk names are the keys in the object
 * 
 *     --> special use: (bundling JQ using dll has used this)
 *      // files in array will be the same one chunk
 *      // files in obj will be diff chunks
 *     {
 *          // one chunk 
 *          index: ['./src/js/index.js', './src/js/add.js'],
 *          // one chunk
 *          sub: './src/js/sub.js'
 *     }
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '/src/js/index.js',

    output: {
        filename: 'js/[name].js',

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

    mode: 'development'
};
