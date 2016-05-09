/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

var webpack = require('webpack');
var webpackHotMiddlewre = require('webpack-hot-middleware');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client';

var masterConfig = require('../webpack.js').webpack.config;
var httpConfig = require('../http.js').http;

// async to sync(blocking)
function sync(generator) {
  var iterable = null;

  function resume(err, val) {
    if (err) iterable.raise(err);
    iterable.next(val);
  }

  iterable = generator(resume);
  iterable.next();
}

// add hot client
var newEntry = {};
Object.keys(masterConfig.entry).map((ep) => {
  var e = masterConfig.entry[ep];
  if (Array.isArray(e)) {
    e.unshift(hotMiddlewareScript);
  // } else if (e.match(/\.jsx?$/)) { // lodashのバグでコンフィグが壊れるから非配列はスルー
  //   e = [ hotMiddlewareScript, e ];
  }
  newEntry[ep] = e;
  return null;
});

var webpackConfig = {
  devtool: 'source-map',
  entry: newEntry,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-3'],
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract(['css?sourceMap']) },
      { test: /\.sass$/, loader: ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap']) },
    ],
  },
  plugins: masterConfig.plugins.concat(
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['.tmp/public'], { root: masterConfig.context, verbose: true }),
    new LiveReloadPlugin({ ignore: /\.(jsx?|map|hot-update\..*)$/ })
  ),
};

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  livereload: true,
  webpack: {
    config: webpackConfig,
  },

  http: {
  //   /****************************************************************************
  //   *                                                                           *
  //   * custom middleware                                                         *
  //   *                                                                           *
  //   ****************************************************************************/
    customMiddleware(app) {
      // To register the middleware from waiting for the initialization of Webpack.
      sync(function *blocking(next) {
        yield sails.on('hook:webpack:loaded', next);
      });

      var compiler = sails.hooks.webpack.compiler;
      app.use(webpackHotMiddlewre(compiler));

      var cm = httpConfig.customMiddleware;
      if (cm) return cm(app);
      return null;
    },
  },
};
