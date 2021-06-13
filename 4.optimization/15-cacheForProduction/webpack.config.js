/**
 * add (cacheDirectory: true) at JS cpmpatibility after the presets
 * 
 * to make sure each time after a bunder, 
 * the name of the bundled files are diff
 * so that the data will be updated at browser if changed
 * so we need to use hash below
 * 
 * overall:
 *  babel cache:
 *      cacheDirectory: true
 *  --> for quick second webpack
 * 
 *  hash: every time webpack, it will change the name if the content changed
 *        so browser will not load the files at memory
 *  
 *  chunk: get the hash name based on the same chunk
 *         since the css is introduced at js, so they are in the same chunk
 * 
 *  contenthash: get hash name according to diff content of the file
 *  --> for better cache
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// reuse this module
const commonCssLoader = [
    MiniCssExtractPlugin.loader,

    'css-loader',

    // css compatibility
    {
        loader: 'postcss-loader',

        options: {
            postcssOptions: {
                plugins: [
                    [
                        'postcss-preset-env',
                            {
                                ident: "postcss"
                            },
                    ],
                ],
            }                  
        }
    }
];

// the default value is production
process.env.NODE_ENV = 'production';

module.exports = {
    entry: './src/js/index.js',

    output: {
        filename: 'js/bundled.[contenthash:10].js',

        path: resolve(__dirname,'build')
    },

    module: {
        rules: [
            // handle css resources
            {
                test: /\.css$/,

                use: [...commonCssLoader]
            },

            // handle less resources
            {
                test: /\.less$/,

                use: [...commonCssLoader, 'less-loader']
            },

            // handle imgs at css files
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

            // handle imgs at html files
            {
                test: /\.html$/,

                loader: 'html-withimg-loader',

                options: {
                    name: '[hash:10].[ext]',
                    
                    outputPath: 'img'
                }
            },

            // js syntax check using airbnb
            {
                test: /\.js$/,

                exclude: /node_modules/,

                // make it is run before the JS compatibility loaders
                enforce: 'pre',

                loader: 'eslint-loader',

                options: {
                    fix: true
                }
            },

            // js compatibility
            {
                test: /\.js$/,

                exclude: /node_modules/,

                loader: 'babel-loader',

                options: {
                    presets: [
                         [
                            '@babel/preset-env',

                            // set what we need to compate
                            {
                                useBuiltIns: 'usage',

                                // tell the version of the core-js
                                corejs: {
                                    version: 3
                                },

                                // to which versions of the browsers
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ],

                    // open the cache for production mode
                    // the second time it will use the cache
                    cacheDirectory: true
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        // extract the css as independent files
        new MiniCssExtractPlugin({
            filename: 'css/mini.[contenthash:10].css'
        }),

        // css files compression
        new OptimizeCssAssetsWebpackPlugin()
    ],

    mode: 'production',

    devtool: 'source-map'
};
