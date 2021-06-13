const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/test.js",

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundled.js",
  },

  resolveLoader: {
    modules: ["node_modules", "./loaders"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "syncLoader",
            options: {
              message: "leo",
            },
          },
          {
            loader: "asyncLoader",
            options: {
              name: "SuperLi",
            },
          },
        ],
      },
    ],
  },
};
