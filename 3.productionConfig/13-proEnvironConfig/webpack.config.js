/**
 * for produciton mode
 * add css and js compression
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// reuse this module
const commonCssLoader = [
  MiniCssExtractPlugin.loader,

  "css-loader",

  // css compatibility
  {
    loader: "postcss-loader",

    options: {
      postcssOptions: {
        plugins: [
          [
            "postcss-preset-env",
            {
              ident: "postcss",
            },
          ],
        ],
      },
    },
  },
];

// the default value is production
process.env.NODE_ENV = "production";

module.exports = {
  entry: "./src/js/index.js",

  output: {
    filename: "bundled.js",

    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [
      // handle css resources
      {
        test: /\.css$/,

        use: [...commonCssLoader],
      },

      // handle less resources
      {
        test: /\.less$/,

        use: [...commonCssLoader, "less-loader"],
      },

      // handle imgs at css files
      {
        test: /\.jpg|png|gif|jpeg$/,

        loader: "url-loader",

        options: {
          limit: 8 * 1024,

          name: "[hash:10].[ext]",

          esModule: false,

          outputPath: "img",
        },
      },

      // handle imgs at html files
      {
        test: /\.html$/,

        loader: "html-withimg-loader",

        options: {
          name: "[hash:10].[ext]",

          outputPath: "img",
        },
      },

      // js syntax check using airbnb
      {
        test: /\.js$/,

        exclude: /node_modules/,

        // make it is run before the JS compatibility loaders
        enforce: "pre",

        loader: "eslint-loader",

        options: {
          fix: true,
        },
      },

      // js compatibility
      {
        test: /\.js$/,

        exclude: /node_modules/,

        loader: "babel-loader",

        options: {
          presets: [
            [
              "@babel/preset-env",

              // set what we need to compate
              {
                useBuiltIns: "usage",

                // tell the version of the core-js
                corejs: {
                  version: 3,
                },

                // to which versions of the browsers
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    // extract the css as independent files
    new MiniCssExtractPlugin({
      filename: "css/mini.css",
    }),

    // css files compression
    new OptimizeCssAssetsWebpackPlugin(),
  ],

  mode: "production",
};
