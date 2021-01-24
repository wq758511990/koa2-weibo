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

// 路由
const errorViewRouter = require('./routes/view/error')
const userViewRuoter = require('./routes/view/users')
const userAPIRouter = require('./routes/api/user')
const index = require('./routes/index')

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
app.use(require('koa-static')(__dirname + '/public'))

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
app.use(index.routes(), index.allowedMethods())
app.use(userViewRuoter.routes(), userViewRuoter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())

// 404 路由放至最后
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
