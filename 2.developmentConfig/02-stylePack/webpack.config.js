/**
 * 1. apply the commonJS(module) at nodeJS environment
 * 2. after configs, open the terminate at such that 02-stylePack
 *    and use webpack, then the files can be bundled
 */

 const { resolve } = require('path');

module.exports = {
    // 1. entry
    entry: './src/index.js',

    // 2. output
    output: {
        // the name of the bundled file
        filename: 'built.js',

        // the absolute path of the bundled file
        path: resolve(__dirname, 'build')
    },

    // 3. loader
    module: {
        rules: [
            // detailed configs
            // different type files must config different loader

            // css files configs
            {
                // match the file types using Regular expression
                test: /\.css$/,

                // define what loaders being used
                // run from the bottom to the top (from right to left)
                use: [
                    // 2. create a style tag, add the style resource in js into the head tag
                    'style-loader',

                    // 1. make the css file as a module(commonJS) in js, the content is string type
                    'css-loader'
                ]
            },

            // less files configs
            {
                test: /\.less$/,

                use: [
                    'style-loader',
                    'css-loader',
                    // convert the less file into the css file
                    // need to install less-loader and less packages
                    'less-loader'
                ]
            }
        ]
    },

    // 4. plugins(array)
    plugins: [

    ],

    // 5. mode
    mode: 'development'
    // mode: 'production'
}
