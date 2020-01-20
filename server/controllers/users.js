/**
 * Created by csl
 * 用户管理
 */
const UsesrModel = require('../models/users')
class UsersContrller {
  async find(ctx) {
    ctx.body = 'user get'
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
      email: { type: 'string', required: true}
    })
    const { name, email } = ctx.request.body;

    const userFindByName = await UsesrModel.findOne({ name })
    if (userFindByName) { ctx.throw(409, '用户已经被使用') }
    const userFindByEmail = await UsesrModel.findOne({ email })
    if (userFindByEmail) { ctx.throw(409, '邮箱已经被使用') }

    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
}

module.exports = new UsersContrller()