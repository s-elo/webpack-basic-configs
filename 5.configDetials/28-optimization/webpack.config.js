
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

    mode: 'production',

    // resolve the rules of modules
    resolve: {
        // give another easy name for the related modules
        /**
         * before config: 
         *  import '../../../css/index.css';
         * 
         * now: 
         *  import '$css/index.css';
         * 
         */
        alias: {
            $css: resolve(__dirname, 'src/css'),
            $js: resolve(__dirname, 'src/js')
        },

        // after this, we can omit the extend name
        extensions: ['.js', '.json'],

        // tell webpack where to find the modules
        // just for more quick
        modules: [
            resolve(__dirname, '../../node_modules'),
            'node_modules'
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all',

            // minimized chunk should be at least 30kb
            miniSize: 30 * 1024,
            // no limit
            maxSize: 0,

            
        }
    }

};
