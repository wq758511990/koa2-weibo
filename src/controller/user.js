/**
 * @description user controller
 * @author wzx
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 用户名 
 */
async function isExists (userName) {
  // 业务逻辑
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 存在
    return new SuccessModel()
  } else {
    // 不存在用户名
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册用户
 * @param {string} useName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 1-男 2-女 3-保密
 */
async function register ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (err) {
    console.error(err.message, err.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登陆函数
 * @param {Object} ctx 上下文
 * @param {Object} userName 用户名
 * @param {Object} password 密码
 */
async function login (ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登陆失败
    return new ErrorModel(loginFailInfo)
  }
  // 登陆成功
  if (!ctx.session.userInfo) {
    console.log('null in')
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

module.exports = {
  isExists,
  register,
  login
}