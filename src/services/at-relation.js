/**
 * @description 微博 @ 用户关系 service
 * @author wzx
 */

const { AtRelation } = require('../db/model/index')

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

module.exports = {
  createAtRelation,
  getAtRelationCount
}