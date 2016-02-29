var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev.js');

var app = express();
var compiler = webpack(config);

//middleware
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8888, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on port 8888')
});
