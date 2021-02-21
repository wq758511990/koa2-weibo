/**
 * @description 微博view 路由
 * @author wzx
 */


const router = require('koa-router')()

const { getAtMeCount } = require('../../controller/blog-at')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExists } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {

  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const blogResult = await getHomeBlogList(userId)

  // 获取粉丝数量
  const fansResult = await getFans(userId)
  const { count: fansCount, userList: fansList } = fansResult.data

  // 获取关注人
  const followersResult = await getFollowers(userId)
  const { count: followersCount, followersList } = followersResult.data

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data
  await ctx.render('index', {
    userData: {
      atCount,
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      }
    },
    blogData: {
      ...blogResult.data
    }
  })
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
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, userList: fansList } = fansResult.data

  // 获取关注人
  // controller
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, followersList } = followersResult.data

  const atCountResult = await getAtMeCount(myUserInfo.id)
  const { count: atCount } = atCountResult.data

  // 我是否关注此人
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })
  await ctx.render('profile', {
    blogData: {
      ...result.data
    },
    userData: {
      atCount,
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
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