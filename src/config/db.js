/**
 * @description 存储配置
 * @author wzx
 * 
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6378,
  host: '192.168.85.129',
  password: '123456'
}

let MYSQL_CONF = {
  host: '192.168.85.129',
  user: 'root',
  password: '123456',
  port: 3305,
  database: 'koa2_weibo_db'
}

if (isProd) {
  REDIS_CONF = {
    port: 6378,
    host: '192.168.85.129',
    password: '123456'
  }
  MYSQL_CONF = {
    host: '192.168.85.129',
    user: 'root',
    password: '123456',
    port: 3305,
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}