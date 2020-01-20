import { useEffect } from 'react'
import { Modal, Form, Input } from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  }
}

const TagFrom = (props) => {
  const {
    tag, visible, handleFormVisible, handleSubmit,
    form: { getFieldDecorator, validateFieldsAndScroll, resetFields } } = props
  const hanldeOK = () => {
    validateFieldsAndScroll((err, values) => {
      if (err) { return }
      handleSubmit({ ...tag, ...values })
    })
  }
  useEffect(() => {
    resetFields()
  }, [tag])

  return (
    <Modal title="添加文章标签" visible={visible} onOk={hanldeOK} onCancel={handleFormVisible}>
      <Form {...formItemLayout}>
        <Form.Item label="标签名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入标签名称' }],
            initialValue: tag.name
          })(<Input />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', { initialValue: tag.description })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const WrappedTagFrom = Form.create({ name: 'tag_form' })(TagFrom)

export default WrappedTagFrom
