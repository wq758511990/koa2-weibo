/**
 * @description 微博 @ 用户关系 service
 * @author wzx
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建微博 @ 用户关系
 * @param {number} blogId blogid
 * @param {number} userId userid
 */
async function createAtRelation (blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量
 * @param {number} userId userId
 */
async function getAtRelationCount (userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * 获取 at 某个用户的微博数据
 * @param {number} userId 
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getAtUserBlogList ({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      // atRelation
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      // User
      {
        model: User,
        attributes: ['userName', 'nickName', 'userAvatar']
      }
    ]
  })
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 更新 atRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation ({ newIsRead }, { userId, isRead }) {
  // 拼接更新内容
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }
  // 拼接查询条件
  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }

  // 执行更新
  const result = await AtRelation.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
}