/**
 * @description sequelize实例
 * @author wzx
 */
const { MYSQL_CONF } = require('../config/db')
const Sequelize = require('sequelize')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database, port } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql',
  port
}
if (isTest) {
  conf.logging = () => { }
}
if (isProd) {
  // 线上环境 使用连接池
  conf.pool = {
    max: 5, // 连接池中最大连接数为5
    min: 0, // 最小
    idle: 10000 // 一个连接池10s之内没有使用就释放
  }
}

const seq = new Sequelize(database, user, password, conf)


// 测试连接


module.exports = seq