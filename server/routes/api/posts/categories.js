/**
 * Created by csl
 * 文章分类
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/api/posts/categories' })
const {
  find, findTree, findById, create, update, delete: del, count,
  checkCategoryNameExists, checkCategorySeoUrlExists
} = require('../../../controllers/posts/categories')
const { jwtAuth, isManager, hasPower } = require('../../../middleware')

// 获取文章分类列表，无需权限
router.get('/', find)
// 返回树形结构的列表，无需权限
router.get('/tree', findTree)
// 新增文章分类
router.post('/', jwtAuth, isManager, hasPower, checkCategoryNameExists, checkCategorySeoUrlExists, create)
// 获取文章分类数量，无需权限
router.get('/count', count)
// 获取指定文章分类，无需权限
router.get('/:id', findById)
// 更新文章分类
router.put('/:id', jwtAuth, isManager, hasPower, checkCategoryNameExists, checkCategorySeoUrlExists, update)
router.patch('/:id', jwtAuth, isManager, hasPower, update)
// 删除文章分类
router.delete('/:id', jwtAuth, isManager, hasPower, del)

module.exports = router
