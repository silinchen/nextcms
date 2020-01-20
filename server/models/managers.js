/**
 * Created by csl
 * 用户管理（后台）
 */
const mongoose = require('mongoose');
const moment = require('moment')
const bcrypt = require('bcrypt');

require('./roles')

const { Schema, model } = mongoose;
const managerSchema = new Schema({
  nickname: { type: String, required: true }, // 用户名名称
  username: { type: String, required: true }, // 用户名(登录)
  password: { type: String, required: true, select: false }, // 密码
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }, // 角色
  avatarUrl: { type: String }, // 头像
  email: { type: String }, // 邮箱
  phone: { type: String }, // 手机
  enable: { type: Boolean }, // 是否启用
  tags: [{ type: String, required: false, default: ''}], // 标签
  introduction: { type: String }, // 介绍
  createdDate: { type: Date, default: Date.now }, // 创建时间
  updatedDate: { type: Date, default: Date.now } // 更新时间
}, {
  versionKey: false // 屏蔽掉 models 自动添加的 __v 字段
})
managerSchema.method('comparePassword', async function(password) {
  return await bcrypt.compare(password, this.password)
})

managerSchema.set('toJSON', { getters: true })

const dateFormat = v => moment(v).format("YYYY-MM-DD HH:mm:ss")
managerSchema.path('createdDate').get(dateFormat)
managerSchema.path('updatedDate').get(dateFormat)

module.exports = model('Manager', managerSchema);
