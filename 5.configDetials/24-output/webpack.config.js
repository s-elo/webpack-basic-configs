
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '/src/js/index.js',

    output: {
        // file name + directory (dir/[name].js)
        filename: 'js/[name].js',

        //the output dir, public dir for all output files
        path: resolve(__dirname, 'build'),

        // public introduced path for all resources
        //        js/index.js --> ./js/index.js
        publicPath: './',

        // non-entry file name
        chunkFilename: 'js/[name]_chunk.js',

        /**
         * a bundled file is a function,
         * so it can be used externally by others
         * 
         * we can generate a var to exposure the function
         * by using library, and the var name is [name]
         */
        library: '[name]', 

        libraryTarget: 'window' // exposure to the window (browser)
        //libraryTarget: 'global' // exposure to the node
        //libraryTarget: 'commonjs' // exposure to using this standard

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
