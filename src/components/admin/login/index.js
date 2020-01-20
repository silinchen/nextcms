import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './styles.less'

const LoginForm = (props) => {
  const { handleSubmit, form: { getFieldDecorator, validateFields } } = props
  
  const onSubmit = e => {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        handleSubmit(values)
      }
    })
  }
  return (
    <Form onSubmit={onSubmit} className={styles.form}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名' }],
        })(
          <Input
            prefix={<Icon type="user" className={styles.input__prefix__icon} />}
            placeholder="用户名"
          />,
        )}
      </Form.Item>
      <Form.Item>       
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }],
        })(
          <Input
            prefix={<Icon type="lock" className={styles.input__prefix__icon} />}
            type="password"
            placeholder="密码"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住我</Checkbox>)}
        <a className={styles.forgot} href="">
          忘记密码？
        </a>
        <Button type="primary" htmlType="submit" className={styles.button}>
          登录
        </Button>
        或 <a href="">立即注册!</a>
      </Form.Item>
    </Form>
  )
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm)

const Login = (props) => (
  <div className={styles.container}>
    <WrappedLoginForm {...props}></WrappedLoginForm>
  </div>
)

export default Login
