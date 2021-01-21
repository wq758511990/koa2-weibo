/**
 * @description error 404路由
 * @author wzx
 */

const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

// 404
router.get('*', async (ctx, next) => { // 未命中路由
  await ctx.render('404')
})

module.exports = router