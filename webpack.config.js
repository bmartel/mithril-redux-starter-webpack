var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var util = require('util');
var isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? '' : 'sourcemap',
  context: path.join(__dirname, 'src'),
  entry: {
    app: ['./app.js']
  },
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'baggage?[file].html=template&[file].css',
      }
    ],
    loaders: [
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=5000&mimetype=application/font-woff&prefix=fonts'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=5000&mimetype=application/octet-stream&prefix=fonts'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=5000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=5000&mimetype=image/svg+xml&prefix=fonts'
      },
      {
        test: /\.css$/,
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
        loader: 'file?name=[path]index.[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[path][hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  postcss: [
    require('postcss-import'),
    require('postcss-extend'),
    require('postcss-functions'),
    require('postcss-cssnext'),
    require('rucksack-css'),
    require('lost')
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css', {
      publicPath: '/',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
      }
    }),
    new webpack.ProvidePlugin({
      'es6-promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.DedupePlugin()
  ]
};
