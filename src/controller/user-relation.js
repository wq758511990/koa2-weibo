/**
 * @description 粉丝 controller
 * @author wzx
 */

const { SuccessModel } = require("../model/ResModel")
const { getUsersByFollower } = require("../services/user-relation")

/**
 * 获取用户粉丝数量
 * @param {number} userId 
 */
async function getFans (userId) {
  // services
  const result = await getUsersByFollower(userId)

  // 返回
  return new SuccessModel({
    ...result
  })
}

module.exports = {
  getFans
}