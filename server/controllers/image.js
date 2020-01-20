/**
 * Created by csl
 * 图片接口
 */
const fs = require('fs')
const path = require('path')
const gm = require('gm')
const send = require('koa-send')
const webp = require('webp-converter');

class ImagesContrller {
  async find(ctx) {
    const name = ctx.params.name
    const width = ctx.params.width
    const height = ctx.params.height

    const sendFile = function(fileName) {
      if(!fs.existsSync(fileName)) { ctx.throw(404, '图片不存在') }
      ctx.type = fileName.split('.')[1]
      ctx.body = fs.createWriteStream(fileName)
    }

    // 根据扩展名判断是不是 webp
    let fileName = name
    const baseroot = path.resolve(__dirname + '../../../public/upload/images/') + '/'
    let root = baseroot
    const isWebp = name.indexOf('.webp') > -1

    if(!fs.existsSync(baseroot + fileName.replace('.webp', ''))) { ctx.throw(404, '图片不存在') }

    const sendJpegOrWebp = async function(_root, _fileName) {
      if(isWebp) {
        const jpegFullName = _root + (_fileName.replace('.webp', ''))
        const _webpRoot = _root + 'webp/'
        const webpFullName = _webpRoot + _fileName
        // 路径不存在则创建
        if (!fs.existsSync(_webpRoot)) {
          fs.mkdirSync(_webpRoot)
        }

        // webp 图片存在，直接发送
        if (fs.existsSync(webpFullName)) {
          await send(ctx, _webpRoot + _fileName, {root: '/'})
          return
        }
        // webp 图片不存在，自动生成
        webp.cwebp(jpegFullName, webpFullName, "-q 80", async function(status, error){
          if(error) {
            // 生成失败，发送普通图片
            await send(ctx, _root + _fileName.replace('.webp', ''), {root: '/'})
          } else {
            // 生成成功，发送 webp 图片
            await send(ctx, _webpRoot + _fileName, {root: '/'})
          }
        })
      } else {
        // 不是 webp 格式的，直接发送图片
        await send(ctx, _root + _fileName, {root: '/'})
      }
    }

    // 如果有传宽的，就获取对应宽度图片，没有的话，就自动生成
    if (width) {
      // upload/images/400/
      root += width + '/'
      // 路径不存在则创建
      if (!fs.existsSync(root)) {
        fs.mkdirSync(root)
      }
      // imgxxx_400.jpg
      const tmp = fileName.split('.')
      const widthFileName = tmp[0] + '_' + width + '.' + tmp[1]
      let widthFullFileName = widthFileName + (isWebp && tmp[2] ? '.' + tmp[2] : '' )
      // 带宽度的缩略图，存在则发送，不存在，则自动生成再发送
      if (fs.existsSync(root + widthFileName)) {
        await sendJpegOrWebp(root, widthFullFileName)
        return
      }
      // 生成缩略图，并发生
      gm(baseroot + name.replace('.webp', '')).resize(width).write(root + widthFileName, async function(error) {
        if (error) {
          await sendJpegOrWebp(baseroot, fileName)
        } else {
          await sendJpegOrWebp(root, widthFullFileName)
        }
      })
    } else {
      await sendJpegOrWebp(baseroot, fileName)
    }
  }
}

module.exports = new ImagesContrller()
