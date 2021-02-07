/**
 * @description 微博数据校验
 * @author wzx
 */
const validate = require('./_validate')
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function blogValidate (data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate