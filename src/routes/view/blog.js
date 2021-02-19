/**
 * @description 微博view 路由
 * @author wzx
 */


const router = require('koa-router')()

const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExists } = require('../../controller/user')
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 获取微博数据

  // 当前登陆用户信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName

  if (isMe) {
    // 是当前登陆用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登陆用户
    const existResult = await isExists(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }


  // controller
  const result = await getProfileBlogList(curUserName, 0)
  await ctx.render('profile', {
    blogData: {
      ...result.data
    },
    userData: {
      userInfo: curUserInfo,
      isMe
    }
  })
})
module.exports = router