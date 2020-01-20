/**
 * Created by csl
 * 文章分类
 */
const mongoose = require('mongoose');
const moment = require('moment')

const { Schema, model } = mongoose;

const postCategorySchema = new Schema({
  name: { type: String, required: true }, // 分类名称
  parentId: [{ type: String, required: false, default: '' }],
  enable: { type: Boolean, default: true }, // 是否显示
  sort: { type: Number, default: 0 }, // 排序
  seoUrl: { type: String, required: true },
  description: { type: String, required: false, default: '' }, // 描述
  createdDate: { type: Date, default: Date.now }, // 添加时间
  updatedDate: { type: Date, default: Date.now }  // 更新时间
}, { 
  versionKey: false, // 屏蔽掉 models 自动添加的 __v 字段
})

postCategorySchema.set('toJSON', { getters: true })

const dateFormat = v => moment(v).format("YYYY-MM-DD HH:mm:ss")
postCategorySchema.path('createdDate').get(dateFormat)
postCategorySchema.path('updatedDate').get(dateFormat)

module.exports = model('PostCategory', postCategorySchema)
