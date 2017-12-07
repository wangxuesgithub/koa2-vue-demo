const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const convert = require('koa-convert');
const static = require('koa-static');
const app = new Koa();

//router
const Router = require('koa-router');

//父路由
const router = new Router();

app.use(views(path.join(__dirname, './src'), {
  extension: 'vue'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

// 由于koa-static目前不支持koa2
// 所以只能用koa-convert封装一下
app.use(convert(static(
  path.join( __dirname,  staticPath)
)))

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//引入子路由
const loginRouter = require('./routes/user.js');
const uploadRouter = require('./routes/upload.js');

//装载子路由
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/api', uploadRouter.routes(), uploadRouter.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(8090, () => {
    console.log('The server is running at http://localhost:' + 8090);
});
