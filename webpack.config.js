var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var util = require('util');
var bourbon = require('node-neat').includePaths.map(function (sassPath) {
  return 'includePaths[]=' + sassPath;
}).join('&');


module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: ['./app.js']
  },
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
  ]
};
