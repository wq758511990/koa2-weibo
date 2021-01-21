/**
 * @description 环境变量
 * @author wzx
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  isProd: ENV === 'production',
  isTest: ENV === 'test'
}