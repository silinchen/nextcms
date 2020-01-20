/**
 * Created by csl
 * 用户管理（后台）
 */
const mongoose = require('mongoose');
const moment = require('moment')
require('./resources')

const { Schema, model } = mongoose;

const roleSchema = new Schema({
  name: { type: String, required: true }, // 名称
  power: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  enable: Boolean, // 是否启用
  description: String, // 描述、备注
  createdDate: { type: Date, default: Date.now }, // 创建时间
  updatedDate: { type: Date, default: Date.now } // 更新时间
}, {
  versionKey: false // 屏蔽掉 models 自动添加的 __v 字段
})

roleSchema.set('toJSON', { getters: true })

const dateFormat = v => moment(v).format("YYYY-MM-DD HH:mm:ss")
roleSchema.path('createdDate').get(dateFormat)
roleSchema.path('updatedDate').get(dateFormat)

module.exports = model('Role', roleSchema);
