const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer'),
    ]
  }
};

const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '/',
  },
};

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  externals: {
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components|dist)/, // 防止解析 mms-vue.js
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          miniCssLoader,
          'css-loader',
          postCssLoader,
        ]
      },
      {
        test: /\.less$/,
        use: [
          miniCssLoader,
          'css-loader',
          'less-loader',
          postCssLoader,
        ]
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: 'assets/images/',
        },
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: 'assets/fonts/',
        },
      },
      {
        test: /\.(mp3|mp4)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: 'assets/media/',
        },
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader',
      },
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './examples/index.html',
      inject: 'body',
    }),
  ],
};
