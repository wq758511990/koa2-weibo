/**
 * @description 广场api路由
 * @author wzx
 */

const { getSquareBlogList } = require('../../controller/blog-square')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

const router = require('koa-router')()
router.prefix('/api/square')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  // controller
  const result = await getSquareBlogList(pageIndex)
  // 渲染为html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router