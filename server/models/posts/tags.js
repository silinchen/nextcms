/**
 * Created by csl
 * 文章标签
 */
const mongoose = require('mongoose');
const moment = require('moment')

const { Schema, model } = mongoose;

const postTagSchema = new Schema({
  name: { type: String, required: true }, // 标签名称
  description: { type: String, required: false }, // 描述
  createdDate: { type: Date, default: Date.now }, // 添加时间
  updatedDate: { type: Date, default: Date.now }  // 更新时间
}, { 
  versionKey: false, // 屏蔽掉 models 自动添加的 __v 字段
})

postTagSchema.set('toJSON', { getters: true })

const dateFormat = v => moment(v).format("YYYY-MM-DD HH:mm:ss")
postTagSchema.path('createdDate').get(dateFormat)
postTagSchema.path('updatedDate').get(dateFormat)

module.exports = model('PostTag', postTagSchema)
