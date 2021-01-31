/**
 * @description utils 路由
 * @author wzx
 */

const router = require('koa-router')()
router.prefix('/api/utils')
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file
  // controller
  ctx.body = await saveFile({
    name,
    filePath: path,
    type,
    size
  })
})

module.exports = router