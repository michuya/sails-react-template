// config/webpack.js

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// compile js assets into a single bundle file
module.exports.webpack = {
  config: {
    context: path.join(__dirname, '..'),
    resolve: {
      extensions: [ '', '.webpack.js', '.web.js', '.js', '.jsx' ],
    },
    entry: { // lodashのバグ対策の為、エントリポイントのファイルを配列で定義
      'css/common.css': ['./assets/styles/common.sass'],
      'js/index.js': ['./assets/js/react/index.jsx'],
      'js/login.js': ['./assets/js/react/login.jsx'],
    },
    output: {
      path: path.resolve(__dirname, '../.tmp/public'),
      publicPath: '/',
      filename: '[name]',
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('[name]'),

      // js/dependencies copy
      new CopyWebpackPlugin([{
        from: 'assets/js/dependencies',
        to: 'js/dependencies',
        force: true,
      }]),

      // images copy
      new CopyWebpackPlugin([{
        from: 'assets/images',
        to: 'images',
        force: true,
      }]),
    ],
    module: {
      loaders: [
        // requires "npm install --save-dev babel-loader"
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-3'],
        },
        { test: /\.css$/, loader: ExtractTextPlugin.extract(['css']) },
        { test: /\.sass$/, loader: ExtractTextPlugin.extract(['css', 'sass']) },
      ],
    },
  },

  // docs: https://webpack.github.io/docs/node.js-api.html#compiler
  watchOptions: {
    aggregateTimeout: 300,
  },
};
