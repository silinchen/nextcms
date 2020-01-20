/**
 * Created by csl
 * 配置文件
 */
module.exports = {
  // token 名称
  tokenKey      : 'CassCMS-Token',
  // jwt 密钥      
  tokenSecret   : 'casscms',  
  // saltRounds 默认值: 10
  // bcrypt hash 加密使用的参数，用于生成盐，理论上数值越大越安全。更多信息请查看 bcrypt 的文档。
  saltRounds    : 10,
  // mongodb 连接参数
  mongodb       : {
    // 数据库
    database    : 'casscms',
    // 主机
    host        : 'localhost',
     // 端口
    port        : 27017,
    // 用户名（选填）      
    username    : '',
    // 密码（选填）
    password    : ''
  },
  // 根据参数生成连接地址，不必修改
  get mongooseConnect() {
    const { database, host, port, username, password } = this.mongodb
    const auth = username ? `${username}:${password}@` : ''
    return `mongodb://${auth}${host}:${port}/${database}`
  }
}