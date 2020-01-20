/**
 * Created by csl
 * 文章管理
 */
const PostsModel = require('../../models/posts')
const PostsCategoriesModel = require('../../models/posts/categories')
const _num = num => (Math.max(parseInt(num), 1))
const getAbstract = content => content.replace(/<[^>]+>/g, "").substring(0, 75).trim()
const rules = {
  title: 'string', // 文章标题
  imageUrl: { type: 'string', required: false, allowEmpty: true } , // 文章缩略图
  content: { type: 'string', required: false, allowEmpty: true }, // 文章内容
  categories: { type: 'array', itemType: 'string'  }, // 分类
  tags: { type: 'array', itemType: 'string', rule: { required: false, allowEmpty: true } } , // 标签
  // author: { type: 'string', required: false, allowEmpty: true }, // 文档作者（管理员）
  // uauthor: { type: 'string', required: false, allowEmpty: true }, // 文档作者(普通用户)
  wordNum: 'number' // 字数
}

class PostsContrller {
  async find(ctx) {
    let { pageSize = 10, current = 1, fields = '', populates = '', cateSeoUrl } = ctx.query
    pageSize = _num(pageSize)
    current = _num(current)
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    const populateOptions = populates.split(';').filter(f => f).map(f => f).join(' ');

    const filter = {}
    // 如果有传
    if(cateSeoUrl) {
      const cate = await PostsCategoriesModel.findOne({ seoUrl: cateSeoUrl })
      if (!cate) { ctx.throw(404, '分类不存在') }
      filter.categories = cate._id
    }

    ctx.body = await PostsModel.
      find(filter).limit(pageSize).
      skip((current - 1) * pageSize).
      select(selectFields).
      populate(populateOptions)
  }
  async findById(ctx) {
    let { fields = '', populates = '' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    const populateOptions = populates.split(';').filter(f => f).map(f => f).join(' ');
    let post = await PostsModel.findById(ctx.params.id).select(selectFields).populate(populateOptions)
    if (!post) { ctx.throw(404, '文章不存在'); }
    ctx.body = post;
  }
  async findBySeoUrl(ctx) {
    let { fields = '', populates = '' } = ctx.query
    const { seoUrl } = ctx.params
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    const populateOptions = populates.split(';').filter(f => f).map(f => f).join(' ');
    
    let post = await PostsModel.findOne({ seoUrl }).select(selectFields).populate(populateOptions)
    if (!post) { ctx.throw(404, '文章不存在'); }
    ctx.body = post
  }
  async create(ctx) {
    ctx.verifyParams(rules)
    const { ...data } = ctx.request.body
    const { manager, _id } = ctx.state.user
    // 是否为 管理员，并把登录用户的 id 赋值给要保存的数据
    if(manager) {
      data.author = _id
    } else {
      data.uauthor = _id
    }
    if(!data.abstract) {
      // 如果没有填写摘要，则自动去 html 标签，并截取前 75 个字符
      data.abstract = getAbstract(data.content)
    }
    const post = await new PostsModel(data).save()
    ctx.body = post
  }
  async update(ctx) {
    ctx.verifyParams(rules)
    const updateData = { ...ctx.request.body, updatedDate: Date.now() }
    if(!updateData.abstract) {
      // 如果没有填写摘要，则自动去 html 标签，并截取前 75 个字符
      updateData.abstract = getAbstract(updateData.content)
    }
    const post = await PostsModel.findByIdAndUpdate(ctx.params.id, updateData)
    if (!post) { ctx.throw(404, '文章不存在') }
    ctx.body = post
  }
  async delete(ctx) {
    const post = await PostsModel.findByIdAndRemove(ctx.params.id);
    if (!post) { ctx.throw(404, '文章不存在'); }
    ctx.status = 204;
  }
  async count(ctx) {
    ctx.body = await PostsModel.countDocuments()
  }
  async checkSeoUrlExists(ctx, next) {
    const { seoUrl } = ctx.request.body
    const query = { seoUrl }
    if(ctx.params.id) {
      query._id = { $ne: ctx.params.id }
    }
    const repeated = await PostsModel.findOne(query)
    if (repeated) { ctx.throw(409, 'seo url 已存在') }
    await next()
  }
  async pageViewing(ctx, next) {
    const { seoUrl } = ctx.params
    let post = await PostsModel.findOneAndUpdate({ seoUrl }, { $inc: { pageView: 1 } })
    if (!post) { ctx.throw(404, '文章不存在'); }
    ctx.body = post;
  }
  
}

module.exports = new PostsContrller()
