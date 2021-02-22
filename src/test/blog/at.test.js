/**
 * @description 微博 @ 关系 test
 * @author wzx
 */

const server = require('../server')
const { Z_COOKIE, L_COOKIE, L_USER_NAME } = require('../testUserInfo')

let BLOG_ID

test('张三创建微博， @李四， 应该成功', async () => {
  const content = `单元测试自动创建的微博 @李四 - ${L_USER_NAME}`
  const result = await server.post('/api/blog/create').send({ content }).set('cookie', Z_COOKIE)
  expect(result.body.errno).toBe(0)
  BLOG_ID = result.body.data.id
})

test('获取李四@列表，应该有张三创建的微博', async () => {
  const res = await server.get('/api/atMe/loadMore/0').set('cookie', L_COOKIE)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  const { blogList } = data
  const isHaveCurBlog = blogList.some(blog => {
    return blog.id === BLOG_ID
  })
  expect(isHaveCurBlog).toBe(true)
})