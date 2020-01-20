import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Router from 'next/router'
import { message } from 'antd'
import { managerLogin } from '@store/actions'
import { md5 } from '@utils'

const LoginWithNoSSR = dynamic(
  () => import('@components/admin/login'),
  { ssr: false }
)
const Login = ({ dispatch }) => {
  const handleSubmit = ({ username, password }) => {
    const data = { username, password: md5(password) }
    const callback = () => {
      message.success('登录成功')
      Router.push('/admin')
    }
    const errorCallback = error => {
      message.error(`登录失败！${error.message || ''}`)
    }
    dispatch(managerLogin(data, callback, errorCallback))
  }
  return <LoginWithNoSSR handleSubmit={handleSubmit} />
}

export default connect()(Login)
