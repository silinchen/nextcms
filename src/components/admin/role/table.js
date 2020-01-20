import { Table, Icon, Button, Divider } from 'antd'

const RoleTable = (props) => {
  const { list, pagination, handleUpdateClick, handleDeleteClick } = props
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
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '显示', dataIndex: 'enable', key: 'enable', width: '100px', render: enableRender },
    { title: '操作', key: 'action', width: '150px', render: actionRender }
  ]
  return (<Table  dataSource={list} columns={columns} pagination={pagination} rowKey="_id" />)
}

export default RoleTable
