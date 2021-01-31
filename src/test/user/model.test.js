/**
 * @description user model test
 * @author wzx
 */

const { User } = require('../../db/model/index')

test('User 模型各个属性, 符合预期', () => {
  // build 构建一个内存的 user 实例， 不会提交到数据库
  const user = User.build({
    userName: 'zhangsan',
    password: '123123',
    nickName: 'zhangsan',
    userAvatar: 'xxx.png',
    city: '北京'
  })
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123123')
  expect(user.nickName).toBe('zhangsan')
  expect(user.gender).toBe(3)
  expect(user.userAvatar).toBe('xxx.png')
  expect(user.city).toBe('北京')
})