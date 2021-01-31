/**
 * @description user controller
 * @author wzx
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo, changeInfoFailInfo } = require('../model/ErrorInfo')
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

/**
 * 删除当前用户
 * @param {string} userName 
 */
async function deleteCurUser (userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}
/**
 * 
 * @param {Object} ctx ctx 
 * @param {string} nickName 
 * @param {string} city 
 * @param {string} picture 
 */
async function changeInfo (ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  // service
  const result = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture
  }, { userName })
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      userAvatar: picture
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
  isExists,
  register,
  login,
  deleteCurUser,
  changeInfo
}