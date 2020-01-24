import { useState, useEffect, forwardRef } from 'react'
import { Upload, Icon, message } from 'antd'
import SparkMD5 from 'spark-md5'
import { precheck } from '@services/upload'

const UploadImage = (props, ref) => {
  const {
    children, value, onChange, action = '/api/upload', name, className, listType, style,
    ...rest
  } = props
  
  const [loading, setLoading] = useState(false)

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  const hanldePrecheck = file => {
    const type = file.name.split('.')[1]
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      var spark = new SparkMD5(); //创建md5对象（基于SparkMD5）
      fileReader.readAsBinaryString(file); //将文件读取为二进制码
      fileReader.onload = async e => {
        spark.appendBinary(e.target.result);
        const md5 = spark.end()
        // 检查文件是否存在，存在则不上传。从而实现秒传
        precheck(`${md5}.${type}`).then(rst => {
          const { code } = rst
          if( code === 1 && url) {
            // 存在
            onChange && onChange(url)
            reject()
          } else {
            resolve()
          }
        }).catch(error => {
          // 不存在
          resolve()
        })
      }
    })
  }

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }
    if(!isJpgOrPng || !isLt2M) {
      return false
    }
    return hanldePrecheck(file)
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading && setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      onChange && onChange(info.file.response.url || '')
      setLoading && setLoading(false)
    }
  }
  
  const transformFile = (file) => {
    const names = file.name.split('.')
    const type = (names && names[1]) || ''
    // 修改文件名为 md5 字符串
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      var spark = new SparkMD5(); //创建md5对象（基于SparkMD5）
      fileReader.readAsBinaryString(file); //将文件读取为二进制码
      fileReader.onload = async e => {
        spark.appendBinary(e.target.result);
        const md5 = spark.end()
        resolve(new File([file], `${md5}.${type}`, { type:file.type }))
      }
    })
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传</div>
    </div>
  )

  return (
    <div {...rest} style={style}>
      <Upload
        // ref={ref}
        name={name}
        listType={listType}
        className={className}
        showUploadList={false}
        action={action}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        transformFile={transformFile}
      >
        {children || (value ? <img src={value} alt="" style={{ width: '100%' }} /> : uploadButton)}
      </Upload>
    </div>
  )
}
export default forwardRef(UploadImage)