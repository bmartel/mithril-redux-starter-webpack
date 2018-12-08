const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MixxWebpack = require("mixx/webpack");

const config = require("./config");
const utils = require("./utils");

module.exports = {
  mode: "production",
  devtool: config.devtool,
  entry: [config.paths.entry],
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": config.paths.app,
    },
  },
  output: {
    path: config.output.path,
    filename: config.output.filename,
    chunkFilename: config.output.chunkFilename,
    publicPath: config.output.publicPath,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
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
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:6].[ext]",
            },
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
            test: /\.hbs$/,
            loader: "handlebars-loader",
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
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
    new HtmlWebpackPlugin(config.html),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, config.template),
    new MiniCssExtractPlugin(config.output.css),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: config.output.publicPath,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new PurgeCssPlugin({
      whitelist: ["*", "button", "img", "input", "optgroup", "select", "textarea", /\[.*\]/, /::.+/],
      paths: [...glob.sync(`${config.paths.app}/**/*.js`, { nodir: true })],
      extractors: [
        {
          extractor: utils.TailwindExtractor,
          extensions: ["html", "js"],
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: "cdn",
      navigateFallback: config.output.publicPath + "index.html",
      navigateFallbackBlacklist: [new RegExp("^/_"), new RegExp("/[^/]+\\.[^/]+$")],
    }),
    new WebpackPwaManifest(config.pwa),
    new MixxWebpack.LoadablePlugin({
      filename: config.output.mixx,
    }),
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
};
