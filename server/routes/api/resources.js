/**
 * Created by csl
 * 资源管理
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/resources' })
const { find, findById, create, update, delete: del, count } = require('../../controllers/resources')
const { jwtAuth, isManager, hasPower } = require('../../middleware')

// 获取资源列表
router.get('/', jwtAuth, isManager, hasPower, find)
// 新增资源
router.post('/', jwtAuth, isManager, hasPower, create)
// 获取资源数量
router.get('/count', jwtAuth, isManager, hasPower, count)
// 获取指定资源
router.get('/:id', jwtAuth, isManager, hasPower, findById)
// 更新资源
router.put('/:id', jwtAuth, isManager, hasPower, update)
router.patch('/:id', jwtAuth, isManager, hasPower, update)
// 删除资源
router.delete('/:id', jwtAuth, isManager, hasPower, del)

module.exports = router
