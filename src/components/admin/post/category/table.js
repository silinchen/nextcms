import { Table, Icon, Button, Divider } from 'antd'

const CategoryTable = (props) => {
  const { list, pagination, handleUpdateCategoryClick, handleDeleteCategoryClick } = props
  const enableRender = enable => (
    <span>
      {enable
        ? <Icon type="check-circle" theme="filled" style={{color: '#52c41a'}} />
        : <Icon type="close-circle" theme="filled" style={{color: 'red'}} />
      }
    </span>
  )
  const actionRender = (text, record) => (
    <span>
      <Button size="small" shape="circle" icon="edit" onClick={() => (handleUpdateCategoryClick(record))} />
      <Divider type="vertical" />
      <Button size="small" shape="circle" icon="delete" onClick={() => (handleDeleteCategoryClick(record._id))}/>
    </span>
  )
  const columns = [
    { title: '类别', dataIndex: 'name', key: 'name', width: '200px' },
    { title: 'SeoUrl', dataIndex: 'seoUrl', key: 'seoUrl', width: '100px' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '排序', dataIndex: 'sort', key: 'sort' },
    { title: '显示', dataIndex: 'enable', key: 'enable', width: '100px', render: enableRender },
    { title: '创建时间', dataIndex: 'createdDate', key: 'createdDate', width: '180px' },
    { title: '更新时间', dataIndex: 'updatedDate', key: 'updatedDate', width: '180px' },
    { title: '操作', key: 'action', width: '150px', render: actionRender }
  ]
  return (<Table  dataSource={list} columns={columns} pagination={pagination} rowKey="_id" />)
}

export default CategoryTable
