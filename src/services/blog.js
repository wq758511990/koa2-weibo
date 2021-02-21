/**
 * @description 微博 service
 * @author wzx
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博数据
 * @param {string} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function createBlog ({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * 获取用户微博列表
 * @param {string} userName 
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getBlogListByUser ({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex, // 跳过x条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'userAvatar'],
        where: userWhereOpts
      }
    ],
  })
  // result.count 总数 与分页无关
  // result.rows 查询结果

  // 获取dataValues
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blog => {
    const user = blog.user.dataValues
    blog.user = formatUser(user)
    return blog
  })
  return {
    count: result.count,
    blogList
  }
}

/**
 * 获取关注者微博列表-首页列表
 * @param {*} userId 
 * @param {*} pageIndex 
 * @param {*} pageSize 
 */
async function getFollowersBlogList ({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'userAvatar']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: {
          userId
        }
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

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
}