/**
 * use dll to bundle the 
 * third-part libs (jquery, react, vue..) independently
 * while code split can only bundle the libs at one file
 * so dll can split the libs furthermore
 * then they can be introduced independently
 * 
 * using :
 * webpack --config webpack.dll.js
 * to run this file instead of webpack.config.js
 * 
 * after bundle the libs independently
 * need to do some configs at the webpack.config.js
 * 
 */

const { resolve } = require('path');
const Webpack = require('webpack');

module.exports = {
    entry: {
        // name: [libs...]
        jquery: ['jquery']
    },

    output: {
        filename: '[name].js',

        path: resolve(__dirname, 'dll'),

        // the final exposure name of the bundled chunk
        library: '[name]_[hash]' 
    },

    plugins: [
        // it will bundle and generate a manifest.json file
        // to provide a reflection for libs above
        new Webpack.DllPlugin({
            name: '[name]_[hash]', 

            path: resolve(__dirname, 'dll/manifest.json')
        })
    ],

    mode: 'production'
};