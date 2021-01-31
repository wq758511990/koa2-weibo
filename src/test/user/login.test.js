/**
 * @description user api test
 * @author wzx
 */

const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存储cookie
let COOKIE = ''

// 注册
test('注册用户，应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户应失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 用户名是否存
test('查询注册用户名，应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测， 非法的格式，注册应该失败', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123', // 用户名不是字母或者下划线开头
    password: 'a', // 最小长度不是3
    gender: 'mail' // 不是数字
  })
  expect(res.body.errno).not.toBe(0)
})

// 登陆
test('登陆，应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })
  expect(res.body.errno).toBe(0)
  COOKIE = res.headers['set-cookie'].join(';')
})

// 删除
test('删除用户，应该成功', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 查询用户
test('删除后再次查询用户名，应该不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).not.toBe(0)
})