const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    demo: './src/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader',
        // Regenerate the regex below by running:
        // > npx are-you-es5 check . -rv
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
        }
      },
      {
        test: /\.(png|jpg|git|woff2|woff|eot|svg|ttf|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    fallback: {
      util: false
    }
  },
  plugins: [
    new HtmlPlugin({
      title: 'React App',
      filename: 'index.html',
      template: './index.html'
    })
  ]
};