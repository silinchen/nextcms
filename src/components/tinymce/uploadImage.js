import { useState } from 'react'
import { Modal, Button, Upload, Icon, message } from 'antd'
import SparkMD5 from 'spark-md5'
import { precheck } from '@services/upload'

let filename = ''

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  });
}

const UploadImage = (props) => {
  const [uploadVisible, setUploadVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewVisible, setVreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('initialState')
  const [fileList, setFileList] = useState([])

  const handleUploadOk = e => {
    props.uploadComplete(fileList)
    setFileList([])
    setUploadVisible(false)
  }

  const handleUploadCancel = e => {
    setFileList([])
    setUploadVisible(false)
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setVreviewVisible(true)
  }

  const handlePreviewOk = e => {
    setVreviewVisible(false)
  }

  const handlePreviewCancel = e => {
    setVreviewVisible(false)
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true)
    }
    if (info.file.status === 'done') {
      setUploading(false)
    }
    setFileList(info.fileList)
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
        filename = `${md5}.${type}`
        // 检查文件是否存在，存在则不上传。从而实现秒传
        precheck(filename).then(rst => {
          const { code, url } = rst
          if(code === 1 && url) {
            // 存在
            file.url = rst.url
            setFileList([...fileList, file])
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

  const beforeUpload = (file) => {
    if(uploading) {
      message.error('请等待上一张图片上传完成!')
    }
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }
    if(uploading || !isJpgOrPng || !isLt2M) {
      // 这里测试必须返回 promise，直接返回 boolean 不起作用
      return new Promise(function (resolve, reject) {reject()})
    }
    return hanldePrecheck(file)
  }

  const transformFile = (file) => {
    const type = file.name.split('.')[1]
    // 修改文件名为 md5 字符串
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      var spark = new SparkMD5(); //创建md5对象（基于SparkMD5）
      fileReader.readAsBinaryString(file); //将文件读取为二进制码
      fileReader.onload = async e => {
        spark.appendBinary(e.target.result);
        const md5 = spark.end()
        filename = `${md5}.${type}`
        resolve(new File([file], filename,{ type:file.type }))
      }
    })
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <div>
      <Button type="primary" icon="upload" size="small" onClick={() => {setUploadVisible(true)}}>上传图片</Button>
      <Modal
        title="上传图片"
        visible={uploadVisible}
        onOk={handleUploadOk}
        onCancel={handleUploadCancel}
        confirmLoading={uploading}
      >
        <Upload
          action="/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          transformFile={transformFile}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </Modal>
      <Modal
        visible={previewVisible}
        onCancel={handlePreviewCancel}
        footer={null}
      >
        <img alt="图片预览" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}
export default UploadImage