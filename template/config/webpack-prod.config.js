'use strict';

const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = merge(webpackCommon, {
  mode: 'production',

  output: {
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: false, module: false }
          },
          {
            loader: 'less-loader',
            options: { plugins: [new CleanCSSPlugin({ advan })] }
          }]
      }
    ]
  },

  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom'
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
});