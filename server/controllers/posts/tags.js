/**
 * Created by csl
 * 文章标签
 */
const PostsTagsModel = require('../../models/posts/tags')
const _num = num => (Math.max(parseInt(num), 1))

const rules = {
  name: 'string',
  description: { type: 'string', required: false, allowEmpty: true }
}

class PostsTagContrller {
  async find(ctx) {
    let { pageSize = 10, current = 1, isPaging = 1 } = ctx.query
    if(isPaging) {
      pageSize = _num(pageSize)
      current = _num(current)
      ctx.body = await PostsTagsModel.find().limit(pageSize).skip((current - 1) * pageSize)
    } else {
      ctx.body = await PostsTagsModel.find()
    }
  }
 
  async findById(ctx) {
    ctx.body = 'Posts Tag findById'
  }
  async checkTagNameExists(ctx, next) {
    const { name } = ctx.request.body
    const query = { name }
    if(ctx.params.id) {
      query._id = { $ne: ctx.params.id }
    }
    const repeatedTag = await PostsTagsModel.findOne(query)
    if (repeatedTag) { ctx.throw(409, '标签已存在') }
    await next()
  }
  
  async create(ctx) {
    ctx.verifyParams(rules)
    const tag = await new PostsTagsModel(ctx.request.body).save()
    ctx.body = tag
  }
  async update(ctx) {
    ctx.verifyParams(rules)
    const updateData = { ...ctx.request.body, updatedDate: Date.now() }
    const tag = await PostsTagsModel.findByIdAndUpdate(ctx.params.id, updateData)
    if (!tag) { ctx.throw(404, '标签不存在') }
    ctx.body = tag
  }
  async delete(ctx) {
    const tag = await PostsTagsModel.findByIdAndRemove(ctx.params.id);
    if (!tag) { ctx.throw(404, '标签不存在'); }
    ctx.status = 204;
  }
  async count(ctx) {
    ctx.body = await PostsTagsModel.countDocuments()
  }
}

module.exports = new PostsTagContrller()
