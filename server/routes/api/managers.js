/**
 * Created by csl
 * 用户管理（管理员）
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/managers' })
const { find, findById, create, update, updateInfo, delete: del, count, login, info, checkManagerExists } = require('../../controllers/managers')
const { jwtAuth, isManager, hasPower } = require('../../middleware')

// 获取管理员用户列表
router.get('/', jwtAuth, isManager, hasPower, find)
// 新加管理员用户
router.post('/', jwtAuth, isManager, hasPower, checkManagerExists, create)
// 获取管理员用户数量
router.get('/count', jwtAuth, isManager, hasPower, count)
// 管理员用户登录
router.post('/login', login)
// 获取管理员用户信息
router.get('/info', jwtAuth, isManager, info)
// 获取指定管理员用户
router.get('/:id', jwtAuth, isManager, hasPower, findById)
// 更新管理员用户
router.put('/:id', jwtAuth, isManager, hasPower, checkManagerExists, update)
// 更新已登录管理员用户的信息
router.patch('/', jwtAuth, isManager, checkManagerExists, updateInfo)
// 删除管理员用户
router.delete('/:id', jwtAuth, isManager, hasPower, del)

module.exports = router
