/**
 * @description 微博 @ 关系 controller
 * @author wzx
 */

const { PAGE_SIZE } = require("../config/constant")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require("../services/at-relation")

/**
 * 获取@ 用户的微博数量
 * @param {number} userId userId
 */
async function getAtMeCount (userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

/**
 * 获取 atme 微博数据
 * @param {number} userId userid
 * @param {number} pageIndex pageindex
 */
async function getAtMeBlogList (userId, pageIndex = 0) {
  const result = await getAtUserBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { blogList, count } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
    blogList
  })
}

/**
 * 标记为已读
 * @param {number} userId 
 */
async function markAsRead (userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
  } catch (error) {
    console.log('err', error)
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}