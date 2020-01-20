/**
 * Created by csl
 * 路由加载
 */
const fs = require('fs')

// 加载 routes/ 目录下的全部路由文件，除了 routes/index.js（本文件）
module.exports = (server) => {
  const requireRoutes = (dir) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(file => {
      const filename = `${dir}/${file.name}`

      if(file.isDirectory()) {
        // 递归加载
        requireRoutes(filename)
      } else {
        // 排除 index.js 文件，最后引入
        if ('index.js' === file.name) { return }
        const route = require(filename)
        server.use(route.routes()).use(route.allowedMethods())
      }
    })
    // index.js 单独引入，排除掉本文件，并且使index.js 最后引入，降低优先级，解决 /:id 匹配到子级路由 /xxx 的问题
    if(dir !== __dirname && fs.existsSync(`${dir}/index.js`)) {
      const route = require(`${dir}/index.js`)
      server.use(route.routes()).use(route.allowedMethods())
    }
  }
  requireRoutes(__dirname)
}