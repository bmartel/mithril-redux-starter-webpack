var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEBUG = process.env.NODE_ENV !== 'production';
var util = require('util');
var bourbon = require('node-neat').includePaths.map(function (sassPath) {
  return 'includePaths[]=' + sassPath;
}).join('&');

var entry = {
  app: ['./app.js']
};

if (DEBUG) {
  entry.app.unshift('webpack/hot/dev-server');
}

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: entry,
  devtool: 'source-map',
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?' + bourbon)
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /\.jpe?g$|\.svg$|\.png$/,
        exclude: /node_modules/,
        loader: 'file?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.ProvidePlugin({
      'es6-promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  devServer: {
    contentBase: pkg.config.buildDir,
    noInfo: true,
    inline: true,
    hot: true,
    port: pkg.config.devPort
  }
};
