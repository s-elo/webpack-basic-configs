/**
 * webpack: really bundle the resources
 * npx web-dev-server: not really, just save at the memory
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',

    output: {
        // relative to the build dir
        filename: 'js/bundled.js',

        path: resolve(__dirname, 'build')
    },

    // loader configs
    module: {
        rules: [
            // handle css
            {
                test: /\.css$/,

                use: ['style-loader', 'css-loader']
            },

            // handle less
            {
                test: /\.less$/,

                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // handle imgs in css
            {
                 test: /\.jpg|png|gif|jpeg$/,

                 loader: 'url-loader',

                 options: {
                     limit: 8*1024,

                     name: '[hash:10].[ext]',

                     esModule: false,

                     outputPath: 'img'
                 }
            },

            // handle imgs in html
            {
                test: /\.html$/,

                loader: 'html-withimg-loader',

                options: {
                    name: '[hash:10].[ext]',
                    
                    outputPath: 'img'
                }
            },

            // other resources
            {
                exclude: /\.html|css|less|js|jpg|png|jpeg|gif$/,

                loader: 'file-loader',

                options: {
                    name: '[hash:10].[ext]',

                    outputPath: 'media'
                }
            }
        ]
    },

    plugins: [
        // handle html
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    mode: 'development',
    // mode: 'production',

    devServer: {
        contentBase: resolve(__dirname, 'build'),

        compress: true,

        port: 5000,

        open: true
    }
}
