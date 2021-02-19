/**
 * @description 个人主页api路由
 * @author wzx
 */

const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

const router = require('koa-router')()
router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  // controller
  const result = await getProfileBlogList(userName, pageIndex)
  // 渲染为html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router