/**
 * @description 微博view 路由
 * @author wzx
 */


const router = require('koa-router')()

const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router