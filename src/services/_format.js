/**
 * @description 数据格式化
 * @author wzx
 */

const { DEFAULT_USERAVATAR, REG_FOR_AT_WHO } = require('../config/constant')
const { timeFormat } = require('../utils/dt')

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

/**
 * 格式化数据库时间
 * @param {Object} obj 微博数据 
 */
function _formatDBTime (obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化微博信息
 * @param {Array  | Object} list 微博列表或者单个微博
 */
function formatBlog (list) {
  if (list === null) {
    return list
  }
  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime).map(_formatContent)
  }
  let result = list
  result = _formatDBTime(list)
  result = _formatContent(result)
  return result
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent (obj) {
  obj.contentFormat = obj.content

  // 格式化@
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    // 1-匹配到的字符串， 2、3- 正则表达式的括号里的内容
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )

  return obj
}

module.exports = {
  formatUser,
  formatBlog
}