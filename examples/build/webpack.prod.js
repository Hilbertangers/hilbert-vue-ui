const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: path.resolve(__dirname, '../index.demo.js'),
  plugins: [
    new BundleAnalyzerPlugin()
  ],
})
