/**
 * @description user view 路由
 * @author wzx
 */


const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
/**
 * 获取登陆信息
 * @param {Object} ctx 上下文
 */
function getLoginInfo (ctx) {
  let data = {
    isLogin: false
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

router.get('/settings', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})


module.exports = router