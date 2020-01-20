/**
 * Created by csl
 * 用户资源（管理员）
 */
const mongoose = require('mongoose');
const moment = require('moment')

const { Schema, model } = mongoose;

const resourceSchema = new Schema({
  name: String, // 资源名称
  type: { type: Number, enum: [1, 2], default: 1, require: true }, // 资源类型：1 普通菜单 2 功能接口
  routePath: { type: String, default: '' }, // 路由路径
  icon: { type: String, default: '' }, // icon 图标样式
  api: { type: String, default: '' }, // Api接口
  method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET', require: false }, // 接口请求方式 GET POST PUT DELETE
  parentId: { type: String, default: '' }, // 父级 id
  show: { type: Boolean, default: true }, // 普通菜单时是否显示在左侧菜单栏
  enable: { type: Boolean, default: true }, // 是否启用
  sort: { type: Number, default: 0 }, // 排序
  description: String, // 描述、备注
  createdDate: { type: Date, default: Date.now }, // 创建时间
  updatedDate: { type: Date, default: Date.now } // 更新时间
}, {
  versionKey: false // 屏蔽掉 models 自动添加的 __v 字段
})

resourceSchema.set('toJSON', { getters: true })

const dateFormat = v => moment(v).format("YYYY-MM-DD HH:mm:ss")
resourceSchema.path('createdDate').get(dateFormat)
resourceSchema.path('updatedDate').get(dateFormat)

module.exports = model('Resource', resourceSchema);

