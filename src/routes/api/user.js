/**
 * @description user API 路由
 * @author wzx
 */

const router = require('koa-router')()
const { isExists, register } = require('../../controller/user')
router.prefix('/api/user')


// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExists(userName)
})

// 注册用户
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

module.exports = router