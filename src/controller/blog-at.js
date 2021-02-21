/**
 * @description 微博 @ 关系 controller
 * @author wzx
 */

const { SuccessModel } = require("../model/ResModel")
const { getAtRelationCount } = require("../services/at-relation")

/**
 * 获取@ 用户的微博数量
 * @param {number} userId userId
 */
async function getAtMeCount (userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

module.exports = {
  getAtMeCount
}