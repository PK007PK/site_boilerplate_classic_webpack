const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4000,
              esModule: false,
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WriteFilePlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src', 'robots.txt'),
        to: path.resolve(__dirname, 'dist', 'robots.txt'),
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'Site boilerplate: home',
      filename: 'index.html',
      template: './src/index.html',
      inject: 'head',
      favicon: './src/images/favicon.ico',
      minify: {
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Site boilerplate: components',
      filename: 'components.html',
      template: './src/components.html',
      inject: 'head',
      favicon: './src/images/favicon.ico',
      minify: {
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Site boilerplate: images',
      filename: 'images.html',
      template: './src/images.html',
      inject: 'head',
      favicon: './src/images/favicon.ico',
      minify: {
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Site boilerplate: section templates',
      filename: 'sectiontemplates.html',
      template: './src/sectiontemplates.html',
      inject: 'head',
      favicon: './src/images/favicon.ico',
      minify: {
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Site boilerplate: lazy background',
      filename: 'lazybackground.html',
      template: './src/lazybackground.html',
      inject: 'head',
      favicon: './src/images/favicon.ico',
      minify: {
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Site boilerplate: screens',
      filename: 'screens.html',
      template: './src/screens.html',
      inject: 'head',
      favicon: './src/images/favicon.ico',
      minify: {
        removeScriptTypeAttributes: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],
  // externals: {
  //   $: 'jquery',
  //   jquery: 'jQuery',
  //   'window.$': 'jquery',
  // },
};
