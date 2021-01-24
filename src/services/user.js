/**
 * @description user service
 * @author wzx
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    whereOpt.password = password
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'userAvatar', 'city'],
    where: whereOpt
  })
  if (result === null) {
    // 未找到
    return result
  }
  // 格式化
  const formatRes = formatUser(result.dataValues)
  return formatRes
}


/**
 * 插入用户数据
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser ({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  const data = result.dataValues
  // 关注自己
  // addFollower(data.id, data.id)
  return data
}

module.exports = {
  getUserInfo,
  createUser
}