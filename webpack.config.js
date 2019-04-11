const devMode = (process.env.NODE_ENV === 'development');
const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './src/pages/index/script.js',
    hello_world: './src/pages/hello_world/script.js'
  },
  output: {
    pathinfo: devMode,
    path: path.resolve(__dirname, 'dist'),
    filename: devMode ? 'assets/scripts/[name].bundle.js' : 'assets/scripts/[name].[contenthash:8].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true
  },
  optimization: {
    minimize: !devMode,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          },
          parallel: true,
          cache: true
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser
        }
      })
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // step 1: lint
      {
        test: /\.(js|mjs)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      // step 2: process js via babel
      {
        test: /\.(js|mjs)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // step 3: process regular CSS via css-loader
      // If we are in production, build a css file otherwise inject a <style> tag
      {
        test: /\.css$/,
        use: [
          (devMode ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
          }),
          'css-loader'
        ],
      },
      // step 4: process Sass via sass-loader. 
      // If we are in production, build a css file otherwise inject a <style> tag
      {
        test: /\.(sass|scss)$/,
        use: [
          (devMode ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
          }),
          'css-loader',
          'sass-loader'
        ],
      },
      // step 5: handle image files via file-loader
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[hash:8].[ext]'
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/public'), to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      title: 'Index Page',
      chunks: ['index'],
      template: 'src/pages/index/template.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World',
      chunks: ['hello_world'],
      template: 'src/pages/hello_world/template.html',
      filename: 'hello_world.html'
    }),
    devMode && new webpack.HotModuleReplacementPlugin(),
    !devMode && new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
    })
  ].filter(Boolean)
};