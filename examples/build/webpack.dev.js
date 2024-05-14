
const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const entry = process.argv[process.argv.length - 1].slice(2)

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: path.resolve(__dirname, `../index.${entry}.js`),
  devServer: {
    contentBase: './dist',
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    inline: true,
    open: true,
    port: 8000,
    public: 'localhost:8000',
    host: '0.0.0.0',
    proxy: {
    },
  },
  plugins: [
    new MiniCssExtractPlugin({ disable: true }),
  ]
})
