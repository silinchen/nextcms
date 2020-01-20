import { Icon, Dropdown, Menu, Avatar, message } from 'antd';
import Router from 'next/router'
import Link from 'next/link'
import { connect } from 'react-redux'
import { removeToken } from '@utils/auth'
import styles from './styles.less'

const AvatarDropdown = ({ avatarUrl }) => {
  const handleLogout = () => {
    removeToken()
    message.success('您已成功退出登录！')
    Router.push('/admin/login')
  }
  const menu = (
    <Menu>
      <Menu.Item key="dashboard">
        <Link href="/admin"><a>首页</a></Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link href="/admin/manager/settings"><a>设置</a></Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link href="/admin/manager/profile"><a>个人中心</a></Link>
      </Menu.Item>
      <Menu.Item key="github">
        <a href="https://github.com/silinchen/casscms" target="_blank">项目地址</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  )
  const avatar = (
    avatarUrl ?
      <Avatar shape="square" src={avatarUrl} /> :
      <Avatar shape="square" icon="user" />
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <div className={styles.avatar__wrapper}>
        {avatar}
        <Icon type="caret-down" />
      </div>
    </Dropdown>
  )
}

const mapStateProps = ({manager: { avatarUrl }}) => ({ avatarUrl })
export default connect(mapStateProps)(AvatarDropdown)
