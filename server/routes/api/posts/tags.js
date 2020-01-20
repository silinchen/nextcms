/**
 * Created by csl
 * 文章标签
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/posts/tags' })
const { find, findById, create, update, delete: del, count, checkTagNameExists } = require('../../../controllers/posts/tags');
const { jwtAuth, isManager, hasPower } = require('../../../middleware')

// 获取文章标签列表，无需权限
router.get('/', find)
// 获取文章标签数量，无需权限
router.get('/count', count)
// 新增文章标签
router.post('/', jwtAuth, isManager, hasPower, checkTagNameExists, create)
// 获取指定文章标签，无需权限
router.get('/:id', findById)
// 更新文章标签
router.put('/:id', jwtAuth, isManager, hasPower, checkTagNameExists, update)
router.patch('/:id', jwtAuth, isManager, hasPower, update)
// 删除文章标签
router.delete('/:id', jwtAuth, isManager, hasPower, del)

module.exports = router
