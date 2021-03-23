const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
// const webpack = require('webpack')

module.exports = merge(webpackCommon, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
});