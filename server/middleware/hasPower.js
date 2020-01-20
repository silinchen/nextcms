const { pathToRegexp } = require("path-to-regexp")
const ManagersModel = require('../models/managers')

const hasPower = async (ctx, next) => {
  const { user, powerType } = ctx.state
  if(!user || !user._id) { ctx.throw(401, '用户没有权限') }

  const whiteList = ['/admin/manager/profile', '/admin/manager/settings']
  if (whiteList.includes(ctx.path)) {
    return next()
  }

  const { _id } = user
  let manager = await ManagersModel.findOne({ _id }).populate({
    path:'role',
    select: 'power',
    populate: {
      path: 'power',
      match: { enable: true, type: powerType || 2, method: ctx.request.method.toUpperCase() }, // 功能接口
      select: '_id api method routePath'
    }
  })

  if (!manager || !manager.role || !manager.role.power) { ctx.throw(401, '用户没有权限') }
  const powers = manager.toObject().role.power
  for(let i = 0; i < powers.length; i++) {
    const testPath = powers[i][powerType === 1 ? 'routePath' : 'api' ]
    if (pathToRegexp(testPath).exec(ctx.path)) {
      // 有权限
      return next()
    }
  }
  // 无权限
  ctx.throw(401, '用户没有权限')
}
module.exports = hasPower
