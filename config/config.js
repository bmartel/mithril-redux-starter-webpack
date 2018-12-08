const pkg = require("../package.json");
const isProd = process.env.NODE_ENV === "production";
const utils = require("./utils");

const output = {
  path: utils.resolve("build"),
  filename: isProd ? "static/js/[name].[chunkhash:6].js" : "static/js/bundle.js",
  chunkFilename: `static/js/[name]${isProd ? ".[chunkhash:6]" : ""}.chunk.js`,
  publicPath: process.env.PUBLIC_PATH || "/",
  css: {
    filename: `static/css/[name]${isProd ? ".[contenthash:6]" : ""}.css`,
    chunkFilename: `static/css/[name]${isProd ? ".[contenthash:6]" : ""}.chunk.css`,
  },
  mixx: "./build/mixx.json",
};

const template = {
  publicUrl: utils.ensureSlash(output.publicPath, false),
};

// Html plugin options
const html = {
  title: "Mithril Redux",
  meta: {
    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  },
  inject: true,
  filename: "index.html",
  template: utils.resolve("config/template.hbs"),
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
  templateVars: template,
};

const pwa = {
  name: html.title,
  short_name: "",
  theme_color: "#000000",
  background_color: "#ffffff",
  description: "",
  crossorigin: null, //can be null, use-credentials or anonymous
  inject: true,
  icons: [
    {
      src: utils.resolve("src/assets/img/icon.png"),
      sizes: [96, 128, 192, 256, 384, 512],
    },
  ],
};

const paths = {
  app: utils.resolve("src"),
  public: utils.ensureSlash(output.publicPath, true),
  entry: utils.resolve("src/index.js"),
  js: [utils.resolve("src"), utils.resolve("test"), utils.resolve("node_modules/midux")],
};

module.exports = {
  devtool: isProd ? false : "cheap-module-source-map",
  html,
  output,
  paths,
  pwa,
  template,
};
