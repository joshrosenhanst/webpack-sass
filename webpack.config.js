const path = require('path');
const devMode = (process.env.NODE_ENV === 'development');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const sass_rule = {
  test: /\.(sass|scss)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: devMode,
        modules: true,
        sourceMap: devMode
      }
    },
    'css-loader',
    'sass-loader'
  ],
};
const image_rule = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: 'assets/img',
        publicPath: '../assets/img'
      },
    },
  ]
};

module.exports = {
  entry: {
    hello_world: './src/pages/hello_world/script.js'
  },
  output: {
    filename: 'assets/scripts/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
        ]
      },
      image_rule,
      sass_rule
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/public'), to: 'assets' }
    ]),
    new MiniCssExtractPlugin({
      filename: devMode ? 'assets/css/[name].css' : 'assets/css/[hash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World',
      chunks: ['hello_world'],
      template: 'src/pages/hello_world/template.html',
      filename: 'hello_world/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};