var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

//TODO ignore API keys in config
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.resolve(ROOT_PATH, '../app/src/index')
  ],
  output: {
    path: path.resolve(ROOT_PATH, '../app/build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'babel-loader'
      },
      {
       test: /\.css$/,
       exclude: /node_modules/,
       use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
       })
     }
   ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin()
  ],
};
