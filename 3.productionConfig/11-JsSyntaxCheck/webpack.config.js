/**
 * 1. using eslint-loader && eslint to check
 * 2. setting the checking rules: 
 *      using airbnb:
 *          eslint-config-airbnb-base && eslint-plugin-import eslint
 * 3. note that only check the code that we write 
 *    and exclude the third-party code or libs
 * 4. configs of the airbnb rules: at package.json
 *      "eslintConfig": {
 *          "extends": "airbnb-base"
 *       }
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
            {
                test: /\.js$/,

                exclude: /node_modules/,

                loader: 'eslint-loader',

                options: {
                    // auto fix the inappropriate syntax
                    fix: true
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
