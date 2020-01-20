import { useEffect } from 'react'
import { Modal, Form, Cascader, Input, InputNumber, Switch } from 'antd'
import { createLabelAndValueTree } from '@utils'

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

const CategoryFrom = (props) => {
  const {
    category, visible, handleFormVisible, handleSubmit, categoryParents = [],
    form: { getFieldDecorator, validateFieldsAndScroll, resetFields } } = props
  const hanldeOK = () => {
    validateFieldsAndScroll((err, values) => {
      if (err) { return }
      handleSubmit({ ...category, ...values })
    })
  }
  useEffect(() => {
    resetFields()
  }, [category])

  return (
    <Modal title="添加文章类别" visible={visible} onOk={hanldeOK} onCancel={handleFormVisible}>
      <Form {...formItemLayout}>
        <Form.Item label="上级类别">
          {getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择上级类别' }],
            initialValue: category.parentId
          })(<Cascader options={categoryParents} expandTrigger="hover" changeOnSelect />)}
        </Form.Item>
        <Form.Item label="类别名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入类别名称' }],
            initialValue: category.name
          })(<Input />)}
        </Form.Item>
        <Form.Item label="显示">
          {getFieldDecorator('enable', {
            valuePropName: 'checked',
            initialValue: category.enable
          })(<Switch />)}
        </Form.Item>
        <Form.Item label="排序">
          {getFieldDecorator('sort', { initialValue: category.sort })(<InputNumber min={0} max={999} />)}
        </Form.Item>
        <Form.Item label="seoUrl">
          {getFieldDecorator('seoUrl', {
            rules: [{ required: true, message: '请输入seo url' }],
            initialValue: category.seoUrl
          })(<Input />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', { initialValue: category.description })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const WrappedCategoryFrom = Form.create({ name: 'category_form' })(CategoryFrom)

export default WrappedCategoryFrom
