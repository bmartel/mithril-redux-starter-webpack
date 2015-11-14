var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var util = require('util');


module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: ['./app.js']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
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
  postcss: [
    require('postcss-import'),
    require('postcss-extend'),
    require('postcss-functions'),
    require('postcss-cssnext'),
    require('postcss-bem'),
    require('lost')
  ],
  plugins: [
    new ExtractTextPlugin('[name].css', {
      publicPath: '/css/',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      'es6-promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
