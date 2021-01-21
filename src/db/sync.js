/**
 * @description sequelize 同步数据库
 * @author wzx
 */

const seq = require('./seq')

// require('./model')

seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(e => {
  console.log('auth err', e)
})
// 执行同步

seq.sync({ force: true }).then(() => {
  console.log('同步成功')
  process.exit() // 退出
})