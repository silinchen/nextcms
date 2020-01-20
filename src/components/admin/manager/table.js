import { Table, Icon, Button, Divider, Avatar } from 'antd'

const ManagerTable = (props) => {
  const { list, pagination, handleUpdateClick, handleDeleteClick } = props
  const avatarUrlRender = (avatarUrl) => (
    <div style={{margin: '-5px 0'}}>
      {avatarUrl ?
        <Avatar shape="square" src={avatarUrl} /> :
        <Avatar shape="square" icon="user" />
      }
    </div>
  )
  const enableRender = enable => (
    <span>
      {enable
        ? <Icon type="check-circle" theme="filled" style={{ color: '#52c41a' }} />
        : <Icon type="close-circle" theme="filled" style={{ color: 'red' }} />
      }
    </span>
  )
  const actionRender = (text, record) => (
    <span>
      <Button size="small" shape="circle" icon="edit" onClick={() => (handleUpdateClick(record))} />
      <Divider type="vertical" />
      <Button size="small" shape="circle" icon="delete" onClick={() => (handleDeleteClick(record._id))}/>
    </span>
  )
  const columns = [
    { title: '头像', dataIndex: 'avatarUrl', key: 'avatarUrl', width: 80, render: avatarUrlRender },
    { title: '名称', dataIndex: 'nickname', key: 'nickname' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '显示', dataIndex: 'enable', key: 'enable', width: '100px', render: enableRender },
    { title: '操作', key: 'action', width: '150px', render: actionRender }
  ]
  return (<Table dataSource={list} columns={columns} pagination={pagination} rowKey="_id" />)
}

export default ManagerTable
