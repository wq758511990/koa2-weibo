/**
 * @description json schema 校验
 * @author wzx
 */

const Ajv = require('ajv').default
const ajv = new Ajv({
  // allErrors: true // 输出所有的错误（比较慢）
})

/**
 * json schema 校验
 * @param {Object} schema 校验规则
 * @param {Object} data 待校验数据
 */
function validate (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate