/**
 * Created by csl
 * 管理员用户管理
 */
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ManagersModel = require('../models/managers')
const ResourcesModel = require('../models/resources')
const { tokenSecret, saltRounds } = require('../config')
const { createTree } = require('../utils')
const _num = num => (Math.max(parseInt(num), 1))

const rules = {
  nickname: 'string', // 名称
  username: 'string', // 管理员用户名（登录）
  password: 'string', // 密码
  introduction: { type: 'string', required: false, allowEmpty: true } , // 头像
  avatarUrl: { type: 'string', required: false, allowEmpty: true } , // 头像
  email: { type: 'string', required: false, allowEmpty: true }, // 邮箱
  phone: { type: 'string', required: false, allowEmpty: true }, // 手机
  enable: 'boolean', // 是否启用
  tags: { type: 'array', itemType: 'string', rule: { required: false } }, // 标签
}

class ManagersContrller {
  // 获取管理员用户列表，不允许返回密码字段
  async find(ctx) {
    let { pageSize = 10, current = 1 } = ctx.query
    pageSize = _num(pageSize)
    current = _num(current)
    ctx.body = await ManagersModel.find().limit(pageSize).skip((current - 1) * pageSize)
  }
  // 获取指定管理员用户，不允许返回密码字段
  async findById(ctx) {
    const manager = await ManagersModel.findById(ctx.params.id)
    if (!manager) { ctx.throw(404, '管理员用户不存在') }
    ctx.body = manager
  }
  async create(ctx) {
    rules.password = 'string'
    ctx.verifyParams(rules)
    const manager = await new ManagersModel(ctx.request.body).save()
    ctx.body = manager
  }
  async update(ctx) {
    rules.password = { type: 'string', required: false, allowEmpty: false }
    ctx.verifyParams(rules)
    const updateData = { ...ctx.request.body, updatedDate: Date.now() }
    const manager = await ManagersModel.findByIdAndUpdate(ctx.params.id, updateData)
    if (!manager) { ctx.throw(404, '管理员用户不存在') }
    ctx.body = manager
  }
  async delete(ctx) {
    const manager = await ManagersModel.findByIdAndRemove(ctx.params.id)
    if (!manager) { ctx.throw(404, '管理员用户不存在') }
    ctx.status = 204
  }
  async count(ctx) {
    ctx.body = await ManagersModel.countDocuments()
  }
  async login(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { username, password } = ctx.request.body
    const manager = await ManagersModel.findOne({ username }).select('+password')
    if (!manager || !(await manager.comparePassword(password))) { ctx.throw(401, '用户名或密码不正确') }

    const { _id, nickname } = manager
    const token = jsonwebtoken.sign({ _id, nickname, manager: true }, tokenSecret, { expiresIn: '1d' })
    ctx.body = { token }
  }
  // 获取登录管理员用户，不允许返回密码字段
  async info(ctx) {
    const { user: { _id } } = ctx.state
    let menus = []

    let manager = await ManagersModel.findOne({ _id }).populate({
      path:'role',
      select: 'name power description'
    })

    if (!manager) { ctx.throw(404, '管理员用户不存在') }
    let resources = await ResourcesModel.
      find(
        { _id: { $in: manager.role.power }, show: true, enable: true, type: 1 },
        '_id name parentId sort icon routePath'
      ).
      sort({ sort: 1 })

    if(resources) {
      menus = createTree(resources.map(item=> (item.toObject())))
    }

    const info = {
      nickname: manager.nickname,
      avatarUrl: manager.avatarUrl,
      introduction: manager.introduction,
      tags: manager.tags,
      role: manager.role,
      email: manager.email,
      phone: manager.phone,
      menus
    }
    ctx.body = info
  }
  // 更新登录管理员用户的信息
  async updateInfo(ctx) {
    const _rules = {}
    const { user: { _id } } = ctx.state
    const data = ctx.request.body

    for(let key in data) {
      if(data.hasOwnProperty(key) && rules.hasOwnProperty(key)) {
        _rules[key] = rules[key]
      }
    }
    if(data.password) {
      // 更新密码资料需要填写确认密码，并且两个密码需要相等
      _rules.password = { type: 'password', compare: 'repassword' }
    }
    ctx.verifyParams(_rules)
    if(data.password) {
      // 使用 bcrypt 对密码进行 hash
      data.password = bcrypt.hashSync(data.password, saltRounds)
    }
    
    const updateData = { ...data, updatedDate: Date.now() }
    const manager = await ManagersModel.findByIdAndUpdate(_id, updateData)
    if (!manager) { ctx.throw(404, '管理员用户不存在') }
    ctx.body = manager
  }
  async checkManagerExists(ctx, next) {
    const { username } = ctx.request.body
    const query = { username }
    if(ctx.params.id) {
      query._id = { $ne: ctx.params.id }
    }
    const repeated = await ManagersModel.findOne(query)
    if (repeated) { ctx.throw(409, `管理员 ${username} 已存在`) }
    await next()
  }
}

module.exports = new ManagersContrller()
