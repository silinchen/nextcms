import { Table, Icon, Button, Divider } from 'antd'
import { createTree } from '@utils'
const ResourceTable = (props) => {
  const { list, handleUpdateClick, handleDeleteClick } = props
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
  const nameRender = (rext, record) => (
    <span>
      {record.icon ? <Icon type={record.icon} /> : ''}{' ' + record.name}
    </span>
  )
  const types = ['', '普通菜单', '功能接口']
  const columns = [
    { title: '名称', key: 'name', width: '250px', render: nameRender },
    { title: '类型', dataIndex: 'type', key: 'type', width: '90px', render: type => types[type] },
    { title: '路由路径', dataIndex: 'routePath', key: 'routePath', width: '180px' },
    { title: 'api', dataIndex: 'api', key: 'api' },
    { title: '排序', dataIndex: 'sort', key: 'sort' },
    { title: '菜单显示', dataIndex: 'show', key: 'show', width: '100px', render: enableRender },
    { title: '启用', dataIndex: 'enable', key: 'enable', width: '80px', render: enableRender },
    { title: '操作', key: 'action', width: '150px', render: actionRender }
  ]

  return (<Table  dataSource={createTree(list)} columns={columns} pagination={false} rowKey="_id" />)
}

export default ResourceTable
