/**
 * This resolve is not the resolve in the path module!
 * It is one of the configs (key)
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
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    mode: 'development',

    devServer: {
        // running code dir
        contentBase: resolve(__dirname, 'build'),

        // watch contentBase, once changed, reload
        watchContentBase: true,

        // watch configs
        watchOptions: {
            // ignore the files, not watch their changes
            ignored: /node_modules/
        },

        // gzip compression
        compress: true,

        port: 5000,
        
        // domain name
        host: 'localhost',

        // auto open browser
        open: true,

        // HMR
        hot: true,

        // not show the logs
        clientLogLevel: 'none',

        // except some basic running infor, not print others
        quiet: true,

        // if wrong, not remind at full screen
        overlay: false,

        // server proxy --> solve the cross-domain problem
        proxy: {
            /**
             * once devServer(5000) recieve the req from'/api/xxx'
             * it will redirect to another server(3000)
             */
            '/api': {
                target: 'http://localhost:3000',

                // when send req, rewrite the req path
                // /api/xxx --> /xxx
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

};
