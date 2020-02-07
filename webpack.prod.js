const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader-srcset',
            options: {
              minimize: true,
              attrs: [':data-srcset', ':data-src', ':srcset', ':src'],
              ignoreCustomFragments: [/(?:^|\W)img(?:$|\W)/],

              // ignoring because of parse error during build. problem with minify, html-loader-srcset, url-loader.
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // sourceMap: true,
              config: {
                path: __dirname + '/postcss.config.js',
                ctx: {
                  env: 'production',
                },
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    // new FaviconsWebpackPlugin({
    //   logo: "./src/images/favicon.svg",
    //   outputPath: "favicon/assets/",
    //   publicPath: "favicon/",
    //   prefix: "assets/",
    //   favicons: {
    //     appName: "my-app",
    //     appDescription: "My awesome App",
    //     developerName: "Me",
    //     developerURL: null, // prevent retrieving from the nearest package.json
    //     background: "#FFFFFF",
    //     theme_color: "#333",
    //     icons: {
    //       coast: false,
    //       yandex: false
    //     }
    //   }
    // }),

    new MiniCssExtractPlugin({
      filename: 'style.[contentHash].css',
      chunkFilename: '[id].css',
    }),
    // new CompressionPlugin({
    //   test: /\.(html|css|js)(\?.*)?$/i, // only compressed html/css/js, skips compressing sourcemaps etc
    // }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      gifsicle: {
        // lossless gif compressor
        optimizationLevel: 9,
      },
      pngquant: {
        // lossy png compressor, remove for default lossless
        quality: '75',
      },
      plugins: [
        imageminMozjpeg({
          // lossy jpg compressor, remove for default lossless
          quality: '75',
        }),
      ],
    }),
    new HtmlCriticalPlugin({
      base: path.join(path.resolve(__dirname), 'dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
  output: {
    filename: '[name].[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
});
