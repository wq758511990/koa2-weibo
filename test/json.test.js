const server = require('./server')

test('json 接口返回格式正确', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({   // 判断对象是否相等
    title: 'koa2 json'
  })
})