/**
 * Created by csl
 * 文件上传
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/upload' })
const { upload, multipleUpload, precheck } = require('../../controllers/upload');
const { jwtAuth } = require('../../middleware')

router.post('/', jwtAuth, upload)
router.post('/multiple', jwtAuth, multipleUpload)
router.get('/precheck/:filename', jwtAuth, precheck)

module.exports = router
