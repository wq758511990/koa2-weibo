/**
 * @description 首页 controller
 * @author wzx
 */
const xss = require('xss')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../config/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')
/**
 * @param {string} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function create ({ userId, content, image }) {
  // 分析并手机content中的@用户
  // content 格式如 'xxx @李四 - lisi'
  const atUserNameList = []
  content = content.replace(
    REG_FOR_AT_WHO,
    // 1-匹配到的字符串， 2、3- 正则表达式的括号里的内容
    (matchStr, nickName, userName) => {
      // 通过正则匹配到用户名
      atUserNameList.push(userName)
      return matchStr
    }
  )

  // 根据 @ 查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  )

  // 根据用户信息获取用户id
  const atUserIdList = atUserList.map(user => user.id)

  // service
  try {
    const blog = await createBlog({ userId, content: xss(content), image })

    // service atRelation 微博 @ 用户
    await Promise.all(atUserIdList.map(userId => {
      createAtRelation(blog.id, userId)
    }))

    return new SuccessModel(blog)
  } catch (error) {
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList (userId, pageIndex = 0) {
  const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
    blogList
  })
}


module.exports = {
  create,
  getHomeBlogList
}