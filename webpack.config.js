const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/out/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".scss", ".js"],
    alias: {
      src: path.resolve(__dirname, "src/out"),
      style: path.resolve(__dirname, "src/style"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "./index.html",
      minify:
        process.env.NODE_ENV === "production"
          ? { collapseWhitespace: true, removeComments: true }
          : false,
    }),
  ],
};
