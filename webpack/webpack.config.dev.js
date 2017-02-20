var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);

//TODO ignore API keys in config
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.resolve(ROOT_PATH, '../app/src/index')
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
       test: /\.css$/,
       exclude: /node_modules/,
       use: ['style-loader', 'css-loader']
     }
   ]
  },
  output: {
    path: path.resolve(ROOT_PATH, '../app/build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({ title: 'Listlogs' }),
  ],
};
