const Router = require('koa-router')
const path = require('path')
const { uploadFile } = require('../controller/upload')

const uploadRouter = new Router()

/**
 * 使用第三方中间件 end
 */

uploadRouter.post('/upload', async (ctx, next) => {
  // 上传文件请求处理
  let result = { success: false }
  let serverFilePath = path.join( __dirname, 'static/image' )

  // 上传文件事件
  result = await uploadFile( ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
});

module.exports = uploadRouter;
