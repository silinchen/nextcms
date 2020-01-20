/**
 * Created by csl
 * 文件上传
 */
const fs = require('fs')
const path = require('path')

class UploadController {
  // 上传单个文件
  async upload(ctx) {
    const file = ctx.request.files.file // 获取上传文件
    const uploadPath = path.join(__dirname, '../../public/upload')
    // 路径不存在则创建
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath)
    }
    if (!fs.existsSync(uploadPath + '/images')) {
      fs.mkdirSync(uploadPath + '/images')
    }

    // 创建可读流
    const reader = fs.createReadStream(file.path)
    
    let filePath = `${uploadPath}/images/${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader
      .pipe(upStream)
      .on('end',function(){
        fs.unlinkSync(file.path)
      })
      .on('error', function(e){ console.log("reader.pipe has error:" + e.message) });
    return ctx.body = JSON.stringify({url: `/image/${file.name}`})
  }
  // 上传多个文件
  async multipleUpload(ctx) {
    const files = ctx.request.files.file // 获取上传文件
    const urls = []
    for (let file of files) {
      fs.renameSync(file.path, path.join(__dirname, '../../public/upload/images') + `/${file.name}`)
      urls.push({url: `/upload/images/${file.name}`})
    }
    return ctx.body = JSON.stringify(urls)
  }
  // 上传图片前，检查图片是否已存在，已存在则不上传，从而实现秒传
  async precheck(ctx) {
    const { filename } = ctx.params
    let result = { code: 0, message: '文件不存在' }
    if (fs.existsSync(path.join(__dirname, '../../public/upload/images') + filename)) {
      result = { code: 1, message: '图片已存在', url: `/image/${filename}` }
    }
    ctx.status = 200
    ctx.body = result
  }
}

module.exports = new UploadController()
