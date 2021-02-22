const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./config/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./config/secretKeys')
const koaStatic = require('koa-static')

// 路由
const atMeAPIRouter = require('./routes/api/blog-at')
const squareAPIRouter = require('./routes/api/blog-square')
const profileAPIRouter = require('./routes/api/blog-profile')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const errorViewRouter = require('./routes/view/error')
const userViewRuoter = require('./routes/view/users')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')

let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
// error handler
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

// 注册ejs， 路由中可以通过ejs的文件名直接找到/views下的ejs
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是koa.sid
  prefix: 'weibo:sess', // redis key 前缀 默认是koa:sess:
  cookie: {
    httpOnly: true,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 // ms
  },
  store: redisStore({
    host: REDIS_CONF.host,
    port: REDIS_CONF.port,
    password: REDIS_CONF.password
  })
}))

// routes
app.use(atMeAPIRouter.routes(), atMeAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userViewRuoter.routes(), userViewRuoter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())

// 404 路由放至最后
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
