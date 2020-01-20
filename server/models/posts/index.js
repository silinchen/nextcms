/**
 * Created by csl
 * 文章管理
 */
const mongoose = require('mongoose')
const moment = require('moment')

const { Schema, model } = mongoose

const postSchema = new Schema({
  title: { type: String, required: true }, // 文章标题
  seoUrl: { type: String, required: true }, // seo url，url链接显示的内容
  imageUrl: String, // 文章缩略图
  abstract: String, // 简要、摘要
  content: { type: String, default: '', select: false }, // 文章内容
  categories: { type: [{ type: String, ref: 'PostCategory' }], required: true, select: false}, // 分类
  tags: { type: [{ type: String, ref: 'PostTag' }], select: false}, // 标签
  author: { type: String, ref: 'Manager', select: false }, // 文档作者（管理员）
  uauthor: { type: String, ref: 'User', select: false }, // 文档作者(普通用户)
  pageView: { type: Number, default: 0, select: false }, // 阅读数
  likeNum: { type: Number, default: 0, select: false }, // 点赞数
  wordNum: { type: Number, default: 0 }, // 字数
  comment: { type: [{ type: Schema.Types.ObjectId, ref: 'PostComment' }], select: false}, // 评论
  createdDate: { type: Date, default: Date.now }, // 创建时间
  updatedDate: { type: Date, default: Date.now } // 更新时间
}, {
  versionKey: false // 屏蔽掉 models 自动添加的 __v 字段
})

postSchema.set('toJSON', { getters: true, virtuals: true })
postSchema.set('toObject', { getters: true, virtuals: true })

// 评论数
postSchema.virtual('commentNum').get(function () {
  return this.commnet ? this.commnet.length : 0
})

const dateFormat = v => moment(v).format("YYYY-MM-DD HH:mm:ss")
postSchema.path('createdDate').get(dateFormat)
postSchema.path('updatedDate').get(dateFormat)

module.exports = model('Post', postSchema)
