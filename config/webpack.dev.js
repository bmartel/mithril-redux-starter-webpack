const path = require("path");
const fs = require('fs');
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const config = require('./config');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 9000;

const devServer =  {
  disableHostCheck: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
  compress: true,
  clientLogLevel: 'none',
  contentBase: config.paths.public,
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  watchOptions: {
    ignored: ignoredFiles(config.paths.app),
  },
  https: false,
  host,
  port,
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
  before(app, server) {
    app.use(evalSourceMapMiddleware(server));
    app.use(errorOverlayMiddleware());
    app.use(noopServiceWorkerMiddleware());
  },
};


module.exports = {
  mode: 'development',
  devtool: config.devtool,
  entry: [
    config.paths.entry,
  ],
  devServer,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: true,
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": config.paths.app,
    }
  },
  output: {
    pathinfo: true,
    filename: config.output.filename,
    chunkFilename: config.output.chunkFilename,
    publicPath: config.output.publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: true,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:6].[ext]',
            },
          },
          {
            test: /\.js$/,
            loader: require.resolve("babel-loader"),
            include: config.paths.js,
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: "[local]___[hash:base64:6]"
                }
              },
              {
                loader: require.resolve("postcss-loader")
              }
            ]
          },
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:6].[ext]',
            },
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(config.html),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, config.template),
    new MiniCssExtractPlugin(config.output.css),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: config.output.publicPath,
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
