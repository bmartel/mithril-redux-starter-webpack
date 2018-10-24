const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const config = require("./config");
const utils = require("./utils")

module.exports = {
  mode: 'production',
  devtool: config.devtool,
  entry: [
    config.paths.entry,
  ],
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
    filename: config.output.filename,
    chunkFilename: config.output.chunkFilename,
    publicPath: config.output.publicPath,
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
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, config.template),
    // new PreloadWebpackPlugin({
    //   rel: "preload",
    //   include: "allChunks"
    // }),
    new MiniCssExtractPlugin(config.output.css),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: config.output.publicPath,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new PurgeCssPlugin({
      whitelist: [
        "*",
        "button",
        "img",
        "input",
        "optgroup",
        "select",
        "textarea",
        /\[.*\]/,
        /::.+/
      ],
      paths: [
        ...glob.sync(`${config.paths.app}/**/*.js`, { nodir: true })
      ],
      extractors: [
        {
          extractor: utils.TailwindExtractor,
          extensions: ["html", "js"]
        }
      ]
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: 'cdn',
      navigateFallback: config.output.publicPath + 'index.html',
      navigateFallbackBlacklist: [
        new RegExp('^/_'),
        new RegExp('/[^/]+\\.[^/]+$'),
      ],
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

