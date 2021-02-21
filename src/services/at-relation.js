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

module.exports = {
  createAtRelation
}