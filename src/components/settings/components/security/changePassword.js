import { Modal, Form, Input, message } from 'antd'
import { connect } from 'react-redux'
import { checkPasswordStrength, md5 } from '@utils'
import { changeManagerPassword } from '@store/actions'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const ChangePassword = (props) => {
  const { form, visible, handleHideForm, dispatch } = props
  const { getFieldDecorator, getFieldValue, validateFields } = form

  const handleChangePassword = () => {
    validateFields((err, values) => {
      if (!err) {
        const data = {
          password: md5(values.password),
          repassword: md5(values.repassword)
        }
        const callback = () => {
          handleHideForm()
          message.success('修改密码成功！')
        }
        dispatch(changeManagerPassword(data, callback))
      }
    })
  }

  const validatorPassword = (rule, value, callback) => {
    // 验证密码复杂性
    if (value && !checkPasswordStrength(value)) {
      callback('密码长度至少8位，并且至少包含大写字母、小写字母、数字、特殊字符中的3种')
    } else {
      getFieldValue('repassword') && validateFields(['repassword'])
      callback()
    }
  }
  const validatorRePassword = (rule, value, callback) => {
    if (value && getFieldValue('password') !== value) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }
  return (
    <Modal
      title="修改密码"
      visible={visible}
      onOk={handleChangePassword}
      onCancel={() => handleHideForm()}
    >
      <Form {...formItemLayout}>
        <Form.Item label="新密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入新密码！' },
              { validator: validatorPassword },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('repassword', {
            rules: [
              { required: true, message: '请输入确认密码' },
              { validator: validatorRePassword },
            ],
          })(<Input.Password />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connect()(Form.create()(ChangePassword))