
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
            // loader  configs
            {
                test: /\.css$/,

                // multiple loaders
                use: ['style-loader', 'css-loader']
                
                // multiple with options
                // use: [
                //     {
                //         loader: 'xxx',
                //         options: {

                //         }
                //     },

                //     {
                //            loader: 'xxx',
                //            options: {
                                
                //            }
                //     }
                // ]
            },

            {
                test: /\.js$/,

                // exclude the files
                exclude: /node_modules/,

                // only check js files in the src dir
                include: resolve(__dirname, 'src'),

                // priority to run
                enforce: 'pre',
                // enforce: 'post', // delay to run
                // single loader
                loader: 'eslint-loader',

                // other configs
                options: {

                }
            },

            {
                // only match one loader,
                // once match, stop checkings
                oneOf: [
                    // loader configs
                ]
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
