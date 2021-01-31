/**
 * @description json schema 验证中间件
 * @author wzx
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成json schema 函数
 * @param {function} validateFn 验证函数 
 */
function genValidator (validateFn) {
  async function validator (ctx, next) {
    // 校验
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
    }
    // 验证成功
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}