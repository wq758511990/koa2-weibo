/**
 * @description 个人主页test
 * @author wzx
 */

const { L_COOKIE, USER_NAME } = require('../testUserInfo')
const server = require('../server')

test('个人主页加载第一页数据， 应该成功', async () => {
  const res = await server.get(`/api/profile/loadMore/${USER_NAME}/0`).set('cookie', L_COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})