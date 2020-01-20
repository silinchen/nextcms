/**
 * Created by csl
 * 文章分类
 */
const PostsCategoriesModel = require('../../models/posts/categories')
const { createTree } = require('../../utils')
const _num = num => (Math.max(parseInt(num), 1))

const rules = {
  parentId: { type: 'array', itemType: 'string', rule: { required: false, allowEmpty: true } },
  name: 'string',
  enable: 'boolean',
  sort: 'number',
  seoUrl: 'string',
  description: { type: 'string', required: false, allowEmpty: true }
}

class PostsCategoryContrller {
  async find(ctx) {
    let { pageSize = 10, current = 1, isPaging = 1 } = ctx.query
    if(isPaging) {
      pageSize = _num(pageSize)
      current = _num(current)
      ctx.body = await PostsCategoriesModel.find().limit(pageSize).skip((current - 1) * pageSize)
    } else {
      ctx.body = await PostsCategoriesModel.find()
    }
  }
  async findTree(ctx) {
    const categories = await PostsCategoriesModel.find().toObject()
    ctx.body = createTree(categories)
  }
  async findById(ctx) {
    ctx.body = 'Posts Category findById'
  }
  async checkCategoryNameExists(ctx, next) {
    const { name } = ctx.request.body
    const query = { name }
    if(ctx.params.id) {
      query._id = { $ne: ctx.params.id }
    }
    const repeatedCategory = await PostsCategoriesModel.findOne(query)
    if (repeatedCategory) { ctx.throw(409, '类别已存在') }
    await next()
  }
  async checkCategorySeoUrlExists(ctx, next) {
    const { seoUrl } = ctx.request.body
    const query = { seoUrl }
    if(ctx.params.id) {
      query._id = { $ne: ctx.params.id }
    }
    const repeatedCategory = await PostsCategoriesModel.findOne(query)
    if (repeatedCategory) { ctx.throw(409, 'seo url 已存在') }
    await next()
  }
  async create(ctx) {
    ctx.verifyParams(rules)
    const category = await new PostsCategoriesModel(ctx.request.body).save()
    ctx.body = category
  }
  async update(ctx) {
    ctx.verifyParams(rules)
    const updateData = { ...ctx.request.body, updatedDate: Date.now() }
    const category = await PostsCategoriesModel.findByIdAndUpdate(ctx.params.id, updateData)
    if (!category) { ctx.throw(404, '类别不存在') }
    ctx.body = category
  }
  async delete(ctx) {
    const category = await PostsCategoriesModel.findByIdAndRemove(ctx.params.id);
    if (!category) { ctx.throw(404, '类别不存在'); }
    ctx.status = 204;
  }
  async count(ctx) {
    ctx.body = await PostsCategoriesModel.countDocuments()
  }
}

module.exports = new PostsCategoryContrller()
