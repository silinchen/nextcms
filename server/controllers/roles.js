/**
 * Created by csl
 * 角色管理
 */
const RolesModel = require('../models/roles')
const _num = num => (Math.max(parseInt(num), 1))

const rules = {
  name: 'string', // 名称
  power: { type: 'array', itemType: 'string' }, // 权限
  enable: 'boolean', // 是否启用
  description: { type: 'string', required: false, allowEmpty: true }, // 描述
}

class RolesContrller {
  async checkRoleExists(ctx, next) {
    const { name } = ctx.request.body
    const query = { name }
    if(ctx.params.id) {
      query._id = { $ne: ctx.params.id }
    }
    const repeated = await RolesModel.findOne(query)
    if (repeated) { ctx.throw(409, '角色已存在') }
    await next()
  }
  async find(ctx) {
    let { pageSize = 10, current = 1 } = ctx.query
    pageSize = _num(pageSize)
    current = _num(current)
    ctx.body = await RolesModel.find().limit(pageSize).skip((current - 1) * pageSize)
  }
  async findById(ctx) {
    const role = await RolesModel.findById(ctx.params.id)
    if (!role) { ctx.throw(404, '角色不存在') }
    ctx.body = role
  }
  async create(ctx) {
    ctx.verifyParams(rules)
    const role = await new RolesModel(ctx.request.body).save()
    ctx.body = role
  }
  async update(ctx) {
    ctx.verifyParams(rules)
    const updateData = { ...ctx.request.body, updatedDate: Date.now() }
    const role = await RolesModel.findByIdAndUpdate(ctx.params.id, updateData)
    if (!role) { ctx.throw(404, '角色不存在') }
    ctx.body = role
  }
  async delete(ctx) {
    const role = await RolesModel.findByIdAndRemove(ctx.params.id)
    if (!role) { ctx.throw(404, '角色不存在') }
    ctx.status = 204
  }
  async count(ctx) {
    ctx.body = await RolesModel.countDocuments()
  }
}

module.exports = new RolesContrller()
