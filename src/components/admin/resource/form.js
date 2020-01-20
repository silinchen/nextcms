import { useEffect, useState } from 'react'
import { Modal, Form, Cascader, Input, InputNumber, Switch, Radio } from 'antd'
import { findInTree } from '@utils'
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

const rules = {
  parentId: [{ required: true, message: '请选择上级资源' }],
  name: [
    { required: true, whitespace: true, message: '请输入资源名称' },
    { min: 2, max: 50, message: '资源名称长度在 2 到 50 之间' }
  ],
  type: [{ required: true, message: '请选择资源类型' }],
  routePath: [
    { required: true, whitespace: true, message: '请输入路由路径' },
    { min: 2, max: 50, message: '路由路径长度在 2 到 50 之间' }
  ],
  icon: [
    { required: false, message: '请输入图标名称' },
    { max: 50, message: '邮箱长度不能超过 50 个字符' }
  ],
  componentPath: [
    { required: true, whitespace: true, message: '请输入组件路径' },
    { min: 2, max: 50, message: '组件路径长度在 2 到 50 之间' }
  ],
  description: [{ max: 50, message: '描述长度不能超过 50 个字符' }]
}

const ResourceFrom = (props) => {
  const {
    formData, visible, handleFormVisible, handleSubmit, resourceParents = [],
    form: { getFieldDecorator, validateFieldsAndScroll, resetFields } } = props
  
  const [type, setType] = useState(formData.type)
  const [parentId, setParentId] = useState([])

  const hanldeOK = () => {
    validateFieldsAndScroll((err, values) => {
      if (err) { return }
      if(values.parentId && values.parentId.length > 0 ){
        values.parentId = values.parentId[values.parentId.length - 1]
      } else {
        values.parentId = ''
      }
      handleSubmit({ ...formData, ...values })
    })
  }
  
  useEffect(() => {
    resetFields()
    setType(formData.type)
    setParentId(formData.parentId !== '' ? findInTree(resourceParents, formData.parentId) : [''])
  }, [formData])
  return (
    <Modal
      title="添加资源"
      visible={visible}
      onOk={hanldeOK}
      onCancel={handleFormVisible}
      style={{ top: 20 }}
    >
      <Form {...formItemLayout}>
        <Form.Item label="上级资源">
          {getFieldDecorator('parentId', { rules: rules.parentId, initialValue: parentId })(
            <Cascader
              options={resourceParents}
              expandTrigger="hover"
              onChange={value => {setParentId(value)}}
              changeOnSelect
            />
          )}
        </Form.Item>
        <Form.Item label="资源名称">
          {getFieldDecorator('name', { rules: rules.name, initialValue: formData.name })(<Input />)}
        </Form.Item>
        <Form.Item label="资源类型">
          {getFieldDecorator('type', { rules: rules.type, initialValue: formData.type })(
            <Radio.Group onChange={(e) => (setType(e.target.value))}>
              <Radio value={1}>普通菜单</Radio>
              <Radio value={2}>功能接口</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {type === 1 ?
          <>
            {!(parentId.length === 1 && parentId[0] === '') && parentId.length !== 0 ?
              <>
                <Form.Item label="路由路径">
                  {getFieldDecorator('routePath', { rules: rules.routePath, initialValue: formData.routePath })(<Input />)}
                </Form.Item>
              </>
            : '' }
            <Form.Item label="图标">
              {getFieldDecorator('icon', { rules: rules.icon, initialValue: formData.icon })(<Input />)}
            </Form.Item>
            <Form.Item label="菜单显示">
              {getFieldDecorator('show', { valuePropName: 'checked', initialValue: formData.show })(<Switch />)}
            </Form.Item>
          </>
        : '' }
        {type === 2 ?
          <Form.Item label="API">
            {getFieldDecorator('api', { rules: rules.api, initialValue: formData.api })(<Input />)}
          </Form.Item>
        : ''}
        <Form.Item label="启用">
          {getFieldDecorator('enable', { valuePropName: 'checked', initialValue: formData.enable })(<Switch />)}
        </Form.Item>
        <Form.Item label="排序">
          {getFieldDecorator('sort', { initialValue: formData.sort })(<InputNumber min={0} max={999} />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', { rules: rules.description, initialValue: formData.description })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const WrappedResourceFrom = Form.create({ name: 'category_form' })(ResourceFrom)

export default WrappedResourceFrom
