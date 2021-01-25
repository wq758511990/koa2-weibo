/**
 * @description 登陆验证中间件
 * @author wzx
 */
const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')
/**
 * API 登陆验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck (ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登陆
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登陆验证 
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect (ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登陆
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`)
}

module.exports = {
  loginCheck,
  loginRedirect
}