/**
 * @description 存储配置
 * @author wzx
 * 
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6378,
  host: '192.168.85.129',
  password: 123456
}

module.exports = {
  REDIS_CONF
}