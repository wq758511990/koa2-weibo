/**
 * @description 微博缓存层
 * @author wzx
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square'

/**
 * 获取广场列表缓存
 * @param {number} pageIndex 页码
 * @param {number} pageSize Pagesize
 */
async function getSquareCacheList (pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // 获取缓存
  const cacheResult = await get(key)
  if (cacheResult !== null) {
    // 获取成功
    return cacheResult
  }
  // 没有缓存 读取数据库
  const result = getBlogListByUser({ pageIndex, pageSize })

  // 设置缓存 过期时间1min
  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCacheList
}