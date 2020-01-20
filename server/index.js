const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const routing = require('./routes')

const { mongooseConnect } = require('./config')

// 使用 mongoose 连接MmongoDB (https://mongoosejs.com/docs/deprecations.html)
// 选项 useNewUrlParser 说明 ：(node:2576) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
// 选项 useUnifiedTopology 说明 ：(node:2259) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To 
// use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
// 选项 useUnifiedTopology 说明 ：(node:2292) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.connect(mongooseConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, () => console.log('> MongoDB connected successfully！'))
mongoose.connection.on('error', console.error)

/**
 * 中间件的文档
 * koa-json-error：异常处理中间件 https://github.com/koajs/json-error
 * koa-parameter： 参数检验中间件 https://github.com/koajs/parameter
 */

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // 错误处理
  server.use(error({
    // 生产环境下，屏蔽掉 stack 详细错误描述字段
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  }))

  server.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 20*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
  }))

  // 参数校验
  parameter(server)

  // 后台接口路由
  routing(server)

  // next 路由处理
  router.all('*', async ctx => {
    // 把 ctx 保存到 req，供页面 initProps 时候使用, 
    ctx.req.ctx = ctx
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })
  server.use(router.routes())

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
