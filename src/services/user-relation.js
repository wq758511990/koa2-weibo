/**
 * @description 用户关系 service
 * @author wzx
 */

const { UserRelation, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表，即该用户粉丝
 * @param {number} followerId 被关注人id
 */
async function getUsersByFollower (followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'userAvatar'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
  let userList = result.rows.map(row => row.dataValues)

  // 格式化 加上用户头像 
  userList = formatUser(userList)
  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注
 * @param {number} userId 用户id
 * @param {number} followerId 被关注用户id
 */
async function addFollower (userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 删除关注信息
 * @param {number} userId 用户id
 * @param {number} followerId 被取消关注用户id
 */
async function deleteFollower (userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower
}