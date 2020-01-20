import { useEffect } from 'react'
import { Modal, Form, Input, Switch, Select } from 'antd'
import cryptoJS from 'crypto-js'
import UploadImage from '@components/uploadImage'

const { Option } = Select;

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
  nickname: [
    { required: true, whitespace: true, message: '请输入昵称' },
    { min: 2, max: 20, message: '昵称长度在 2 到 20 之间' }
  ],
  username: [
    { required: true, whitespace: true, message: '请输入用户名' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 之间' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 50, message: '密码长度在 6 到 30 之间' }
  ],
  role: [
    { required: true, message: '请选择角色' }
  ],
  email: [
    { required: false, type: 'email', message: '请输入正确的邮箱格式' },
    { max: 100, message: '邮箱长度不能超过 100 个字符' }
  ],
  phone: [{ max: 20, message: '手机号码长度不能超过 20 个字符' }],
  introduction: [{ max: 50, message: '介绍信息长度不能超过 50 个字符' }]
}

const ManagerFrom = (props) => {
  const {
    formData, roles, action, visible, handleFormVisible, handleSubmit,
    form: { getFieldDecorator, validateFieldsAndScroll, resetFields } } = props
  const hanldeOK = () => {
    validateFieldsAndScroll((err, values) => {
      if (err) { return }
      if(values.password) {
        // 密码进行 md5 加密
        values = { ...values, password: cryptoJS.MD5(String(values.password)).toString() }
      }
      handleSubmit({ ...formData, ...values })
    })
  }
  useEffect(() => {
    resetFields()
  }, [formData])

  rules.password[0].required = action ==='add'

  return (
    <Modal
      title={action === 'add' ? '新增管理员用户' : '修改管理员用户'}
      visible={visible}
      onOk={hanldeOK}
      onCancel={handleFormVisible}
      style={{ top: 20 }}
    >
      <Form {...formItemLayout}>
        <Form.Item label="昵称">
          {getFieldDecorator('nickname', { rules: rules.nickname, initialValue: formData.nickname })(<Input />)}
        </Form.Item>
        <Form.Item label="用户名">
          {getFieldDecorator('username', { rules: rules.username, initialValue: formData.username })(<Input />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', { rules: rules.password, initialValue: formData.password })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator('role', { rules: rules.role, initialValue: formData.role })(
            <Select>
              {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="头像">
          {getFieldDecorator('avatarUrl', { initialValue: formData.avatarUrl })(<UploadImage />)}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator('email', { rules: rules.email, initialValue: formData.email })(<Input />)}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator('phone', { rules: rules.phone, initialValue: formData.password })(<Input />)}
        </Form.Item>
        <Form.Item label="启用">
          {getFieldDecorator('enable', { valuePropName: 'checked', initialValue: formData.enable })(<Switch />)}
        </Form.Item>
        <Form.Item label="介绍">
          {getFieldDecorator('introduction', { rules: rules.introduction, initialValue: formData.introduction })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const WrappedManagerFrom = Form.create({ name: 'Manager_form' })(ManagerFrom)

export default WrappedManagerFrom
