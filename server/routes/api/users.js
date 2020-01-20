/**
 * Created by csl
 * 用户管理
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/users' })
const { find } = require('../../controllers/users')

router.get('/', find)

module.exports = router

