/**
 * @description 艾特api路由
 * @author wzx
 */

const { getAtMeBlogList } = require('../../controller/blog-at')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

const router = require('koa-router')()
router.prefix('/api/atMe')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  // controller
  const { id: userId } = ctx.session.userInfo
  const result = await getAtMeBlogList(userId, pageIndex)
  // 渲染为html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router