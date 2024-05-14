const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
const Components = require('../components.json')
process.env.NODE_ENV = 'production';

const entry = {
  ...Components,
  utils: path.resolve(__dirname, '../src/utils/index.js')
}

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  entry,
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
});
