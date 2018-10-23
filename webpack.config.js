const path = require("path");
const webpack = require("webpack");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pkg = require("./package.json");

const isProd = process.env.NODE_ENV === "production";
const resolve = dir => path.join(__dirname, dir);

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? "" : "sourcemap",
  context: path.join(__dirname, "src"),
  entry: {
    app: ["./app.js"]
  },
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: "/",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": resolve("src")
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: "single"
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          "url-loader?limit=5000&mimetype=application/font-woff&prefix=fonts"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          "url-loader?limit=5000&mimetype=application/octet-stream&prefix=fonts"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          "url-loader?limit=5000&mimetype=application/vnd.ms-fontobject&prefix=fonts"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=5000&mimetype=image/svg+xml&prefix=fonts"
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
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/midux")
        ]
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[path]index.[ext]",
        include: [resolve("src")]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=[path][hash].[ext]",
          {
            loader: "image-webpack-loader",
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch:
        "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),
    new MiniCssExtractPlugin(),
    isProd
      ? new PurgecssPlugin({
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
            ...glob.sync(`${path.resolve("src")}/**/*.js`, { nodir: true })
          ],
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ["html", "js"]
            }
          ]
        })
      : null,
    new HtmlWebpackPlugin({
      title: "Mithril Redux",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }
    }),
    isProd
      ? new PreloadWebpackPlugin({
          rel: "preload",
          include: "allChunks"
        })
      : null
  ].filter(p => p)
};
