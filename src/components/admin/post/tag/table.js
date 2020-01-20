import { Table, Button, Divider } from 'antd'

const TagTable = (props) => {
  const { tags, pagination, handleUpdateTagClick, handleDeleteTagClick } = props
  
  const actionRender = (text, record) => (
    <span>
      <Button size="small" shape="circle" icon="edit" onClick={() => (handleUpdateTagClick(record))} />
      <Divider type="vertical" />
      <Button size="small" shape="circle" icon="delete" onClick={() => (handleDeleteTagClick(record._id))}/>
    </span>
  )
  const columns = [
    { title: '标签名', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '创建时间', dataIndex: 'createdDate', key: 'createdDate' },
    { title: '更新时间', dataIndex: 'updatedDate', key: 'updatedDate' },
    { title: '操作', key: 'action', width: '150px', render: actionRender }
  ]
  return (<Table  dataSource={tags} columns={columns} pagination={pagination} rowKey="_id" />)
}

export default TagTable
