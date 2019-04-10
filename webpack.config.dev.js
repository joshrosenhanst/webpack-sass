const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const css_extract_plugin = new MiniCssExtractPlugin({
  filename: 'css/[name].css',
  chunkFilename: '[id].css'
});
const sass_rule = {
  test: /\.(sass|scss)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
        modules: true,
        sourceMap: true
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
        outputPath: 'img',
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
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '../assets'
  },
  mode: 'development',
  module: {
    rules: [
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
  plugins: [
    css_extract_plugin,
    new HtmlWebpackPlugin({
      title: 'Hello World',
      chunks: ['hello_world'],
      template: 'src/pages/hello_world/template.html',
      filename: '../hello_world/index.html'
    })
  ],
};