var path = require('path');
var koa = require('koa');
var router = require('koa-router')();
var send = require('koa-send');

var webpack = require('webpack');
var wbpkHotMiddleware = require('webpack-hot-middleware')
var config = require('../../webpack/webpack.config.dev.js');
var compiler = webpack(config);
var webpackMiddleware = require('koa-webpack-dev-middleware');

var app = koa();

var ROOT_PATH = path.resolve(__dirname);


//MIDDLEWARE

//setting up webpack dev environment
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// app.use(function *(next) {
//   yield wbpkHotMiddleware(compiler).bind(null, this.req, this.res);
//   yield next;
// });


//ROUTES
router.get('*', function *(){
  yield send(this, 'app/build/index.html');
});

//setting up koa routing
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888);
console.log('listening on 8888');
