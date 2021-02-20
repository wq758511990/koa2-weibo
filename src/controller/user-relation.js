/**
 * @description 粉丝 controller
 * @author wzx
 */

const { addFollowerFailInfo, deleteFollowerFailInfo } = require("../model/ErrorInfo")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { getUsersByFollower, addFollower, deleteFollower, getFollowersByUser } = require("../services/user-relation")

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

/**
 * 获取关注人列表
 * @param {number} userId 用户id
 */
async function getFollowers (userId) {
  // service
  const { count, userList } = await getFollowersByUser(userId)
  return new SuccessModel({
    count,
    followersList: userList
  })
}

/**
 * 关注
 * @param {number} myUserId 登陆用户id
 * @param {number} curUserId 被关注用户id
 */
async function follow (myUserId, curUserId) {
  // service
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} myUserId 登陆用户id
 * @param {number} curUserId 被关注用户id
 */
async function unFollow (myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow
}