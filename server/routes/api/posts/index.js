/**
 * Created by csl
 * 文章管理
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/posts' })
const { find, findById, findBySeoUrl, create, update, delete: del, count,
  pageViewing, checkSeoUrlExists } = require('../../../controllers/posts')
const { jwtAuth, isManager, hasPower } = require('../../../middleware')

// 获取文章列表，无需权限
router.get('/', find)
// 新增文章
router.post('/', jwtAuth, isManager, hasPower, checkSeoUrlExists, create)
// 获取文章数量，无需权限
router.get('/count', count)
// 增加文章阅读数，无需权限
router.patch('/pageViewing/:seoUrl', pageViewing)
// 通过 seo url 获取指定文章，无需权限
router.get('/:seoUrl/seoUrl', findBySeoUrl)
// 通过 id 获取指定文章，无需权限
router.get('/:id', findById)
// 更新文章
router.put('/:id', jwtAuth, isManager, hasPower, checkSeoUrlExists, update)
router.patch('/:id', jwtAuth, isManager, hasPower, checkSeoUrlExists, update)
// 删除文章
router.delete('/:id', jwtAuth, isManager, hasPower, del)

module.exports = router
