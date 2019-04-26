const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const config = require("./config");

const protocol = process.env.HTTPS === "true" ? "https" : "http";
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 9000;

const devServer = {
  disableHostCheck: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
  compress: true,
  clientLogLevel: "none",
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
  mode: "development",
  devtool: config.devtool,
  entry: [config.paths.entry],
  devServer,
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
    runtimeChunk: true,
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: config.paths.alias,
  },
  output: {
    pathinfo: true,
    path: config.output.path,
    filename: config.output.filename,
    chunkFilename: config.output.chunkFilename,
    publicPath: config.output.publicPath,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:6].[ext]",
            },
          },
          {
            test: /\.mjs$/,
            type: "javascript/auto",
          },
          {
            test: /\.js$/,
            loader: "babel-loader",
            include: config.paths.js,
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
          },
          {
            test: /\.hbs$/,
            loader: "handlebars-loader",
          },
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.hbs$/, /\.json$/],
            loader: "file-loader",
            options: {
              name: "static/media/[name].[hash:6].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin(config.html),
    new MiniCssExtractPlugin(config.output.css),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({
      fileName: config.output.manifest,
      publicPath: config.output.publicPath,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
    setImmediate: false,
  },
};
