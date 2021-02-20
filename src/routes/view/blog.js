/**
 * @description 微博view 路由
 * @author wzx
 */


const router = require('koa-router')()

const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExists } = require('../../controller/user')
const { getFans } = require('../../controller/user-relation')
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

  // 获取粉丝数量
  console.log('curUserInfo', curUserInfo)
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, userList: fansList } = fansResult.data

  // 我是否关注此人
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })
  await ctx.render('profile', {
    blogData: {
      ...result.data
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      amIFollowed
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  await ctx.render('square', {
    blogData: {
      ...result.data
    }
  })
})
module.exports = router