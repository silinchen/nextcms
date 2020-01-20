/**
 * Created by csl
 * 资源管理
 */
const ResourcesModel = require('../models/resources')
const _num = num => (Math.max(parseInt(num), 1))

const rules = {
  name: 'string', // 资源名称
  type: 'number', // 资源类型：1 普通菜单 2 功能菜单
  routePath: { type: 'string', required: false, allowEmpty: true }, // 路由路径
  icon: { type: 'string', required: false, allowEmpty: true }, // icon 图标样式
  api: { type: 'string', required: false, allowEmpty: true }, // 资源路径
  parentId: { type: 'string', required: false, allowEmpty: true }, // 父级 id
  show: 'boolean', // 是否显示菜单
  enable: 'boolean', // 是否启用
  sort: 'number', // 排序
  description: { type: 'string', required: false, allowEmpty: true }, // 描述、备注
}

class ResourcesContrller {
  async find(ctx) {
    ctx.body = await ResourcesModel.find().sort({ sort: 1 })
  }
  async findById(ctx) {
    const manager = await ResourcesModel.findById(ctx.params.id)
    if (!manager) { ctx.throw(404, '资源不存在') }
    ctx.body = manager
  }
  async create(ctx) {
    ctx.verifyParams(rules)
    const manager = await new ResourcesModel(ctx.request.body).save()
    ctx.body = manager
  }
  async update(ctx) {
    ctx.verifyParams(rules)
    const updateData = { ...ctx.request.body, updatedDate: Date.now() }
    const manager = await ResourcesModel.findByIdAndUpdate(ctx.params.id, updateData)
    if (!manager) { ctx.throw(404, '资源不存在') }
    ctx.body = manager
  }
  async delete(ctx) {
    const manager = await ResourcesModel.findByIdAndRemove(ctx.params.id)
    if (!manager) { ctx.throw(404, '资源不存在') }
    ctx.status = 204
  }
  async count(ctx) {
    ctx.body = await ResourcesModel.countDocuments()
  }
}

module.exports = new ResourcesContrller()
