const pkg = require("../package.json");
const isProd = process.env.NODE_ENV === "production";
const utils = require("./utils");

// Html plugin options
const html = {
  title: "Mithril Redux",
  meta: {
    "theme-color": "#000000",
    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
  },
  inject: true,
  template: utils.resolve("public/index.html"),
  minify: {
    removeComments: isProd,
    collapseWhitespace: isProd,
    removeRedundantAttributes: isProd,
    useShortDoctype: isProd,
    removeEmptyAttributes: isProd,
    removeStyleLinkTypeAttributes: isProd,
    keepClosingSlash: isProd,
    minifyJS: isProd,
    minifyCSS: isProd,
    minifyURLs: isProd,
  },
};

// Entry index.html interpolation replacements %VAR%
const output = {
  path: utils.resolve("build"),
  filename: isProd ? 'static/js/[name].[chunkhash:6].js' : 'static/js/bundle.js',
  chunkFilename: `static/js/[name]${isProd ? '.[chunkhash:6]' : ''}.chunk.js`,
  publicPath: process.env.PUBLIC_PATH || "/",
  css: {
    filename: `static/css/[name]${isProd ? '.[contenthash:6]' : ''}.css`,
    chunkFilename: `static/css/[name]${isProd ? '.[contenthash:6]' : ''}.chunk.css`,
  }
};

const paths = {
  app: utils.resolve("src"),
  public: utils.ensureSlash(output.publicPath, true),
  entry: utils.resolve("src/index.js"),
  js: [
    utils.resolve("src"),
    utils.resolve("test"),
    utils.resolve("node_modules/midux")
  ]
};

const template = {
  PUBLIC_PATH: utils.ensureSlash(output.publicPath, false),
};

module.exports = {
  devtool: isProd ? false : 'cheap-module-source-map',
  html,
  output,
  paths,
  template,
};
