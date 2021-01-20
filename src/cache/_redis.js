/**
 * @description 连接 redis 方法
 * @author wzx
 */

const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, REDIS_CONF.password)

redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * redis set
 * @param {string} key key 
 * @param {string} value val
 * @param {number} timeout 过期时间
 */
function set (key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}
/**
 * redis get
 * @param {string} key 
 */
function get (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(rer)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
    })
  })
  return promise
}


module.exports = {
  set,
  get
}