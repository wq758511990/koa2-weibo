/**
 * @description 数据格式化
 * @author wzx
 */

const { DEFAULT_USERAVATAR } = require('../config/constant')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象 
 */
function _formatUserAvatar (obj) {
  if (obj.userAvatar === null) {
    obj.userAvatar = DEFAULT_USERAVATAR
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array  | Object} list 用户列表或者单个用户
 */
function formatUser (list) {
  if (list === null) {
    return
  }
  if (list instanceof Array) {
    // 数组
    return list.map(user => _formatUserAvatar(user))
  }
  // 对象
  return _formatUserAvatar(list)
}

module.exports = {
  formatUser
}