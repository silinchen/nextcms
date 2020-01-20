/**
 * Created by csl
 * 用户管理（管理员）
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/image' })
const { find } = require('../controllers/image')

router.get('/:name/:width?', find)

module.exports = router
