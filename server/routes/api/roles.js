/**
 * Created by csl
 * 角色管理
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/roles' })
const { find, findById, create, update, delete: del, count, checkRoleExists } = require('../../controllers/roles')
const { jwtAuth, isManager, hasPower } = require('../../middleware')

// 获取角色列表
router.get('/', jwtAuth, isManager, hasPower, find)
// 新增角色
router.post('/', jwtAuth, isManager, hasPower, checkRoleExists, create)
// 获取角色数量
router.get('/count', jwtAuth, isManager, hasPower, count)
// 获取指定角色
router.get('/:id', jwtAuth, isManager, hasPower, findById)
// 更新角色
router.put('/:id', jwtAuth, isManager, hasPower, checkRoleExists, update)
router.patch('/:id', jwtAuth, isManager, hasPower, checkRoleExists, update)
// 删除角色
router.delete('/:id', jwtAuth, isManager, hasPower, del)

module.exports = router
