const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(ROOT_PATH, '../app/src/index.js')
  ],
  output: {
    path: path.resolve(ROOT_PATH, '../gh-pages'),
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
       use: [
        {loader: 'style-loader'},
        {loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'}
       ]
     },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {loader: 'file-loader', options: {publicPath: 'images/', outputPath: 'images/'}}
      ]
    }
   ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    })
  ]
};
