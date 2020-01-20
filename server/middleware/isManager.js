const isManager = (ctx, next) => {
  const  { user } = ctx.state
  if(!user || !user.manager) {
    ctx.throw(401, '用户没有权限（令牌、用户名、密码错误）。')
  }
  return next()
}
module.exports = isManager
