const path = require('path');
const Koa = require('koa');
const router = require('koa-router')();
const send = require('koa-send');

const logger = require('koa-logger');

const webpack = require('webpack');
const config = require('../../webpack/webpack.config.dev.js');
const compiler = webpack(config);
const webpackMiddleware = require('koa-webpack');

const app = new Koa();

const STATIC_FILES_PATH = path.resolve(__dirname, '../../app/build/');



//setting up webpack dev environment
app.use(logger());
app.use(webpackMiddleware({compiler}));

app.use(async (ctx) => {
  await send(ctx, '/app/build/index.html');
});


//setting up koa routing

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888);

console.log('asdf', __dirname);
console.log('listening on 8888');
