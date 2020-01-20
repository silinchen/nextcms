import { useEffect, useState } from 'react'
import { List } from 'antd';
import ChangePassword from './changePassword'

const passwordStrength = {
  strong: (
    <span style={{ color: 'green' }}>强</span>
  ),
  medium: (
    <span className={{ color: 'yellow' }}>中</span>
  ),
  weak: (
    <span className={{ color: 'red' }}>弱</span>
  ),
}

const SecurityView = props => {
  const { currentUser } = props
  const { email } = currentUser
  let view

  const [formVisible, setFormVisible] = useState(false)

  const handleShowForm = () => {
    setFormVisible(true)
  }
  const handleHideForm = () => {
    setFormVisible(false)
  }

  const data = [
    {
      title: '账户密码',
      description: <>当前密码强度：{passwordStrength.strong}</>,
      actions: [
        <a key="Modify" onClick={handleShowForm}>修改</a>,
      ],
    },
    {
      title: '邮箱绑定',
      description: email ? `当前已绑定邮箱：${email}` : '未绑定邮箱',
      actions: [
        <a key="Modify">修改</a>,
      ],
    },
  ]
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />

      <ChangePassword visible={formVisible} handleHideForm={handleHideForm} />
    </>
  )
}

export default SecurityView
