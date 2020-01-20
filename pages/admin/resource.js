import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { message,  Modal, Button } from 'antd'
import Layout from '@layout/admin'
import RescourceTable from '@components/admin/resource/table'
import ResourceForm from '@components/admin/resource/form'
import { getResources, getResourcesCount, addResource, updateResource, deleteResource } from '@store/actions'
import { createLabelAndValueTree } from '@utils'
import withManagerAuth from '@components/withManagerAuth'

const { confirm } = Modal

const defaultResource = {
  name: '', // 资源名称
  type: 1, // 资源类型：1 普通菜单 2 功能菜单
  routePath: '', // 路由路径
  icon: '', // icon 图标样式
  api: '', // 资源路径
  parentId: '', // 父级 id
  show: true,
  enable: true,
  sort: 0, // 排序
  description: '', // 描述、备注
}

const Resource = ({ list, dispatch }) => {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState('add')
  const [formData, setFormData] = useState(defaultResource)

  const handleFormVisible = flag => (setVisible(!!flag))
  const handleShowForm = (action = 'add', record = defaultResource) => {
    setAction(action)
    setFormData({...record})
    handleFormVisible(true)
  }
  const handleSubmit = (record) => {
    const callback = () => {
      dispatch(getResources())
      message.success(action === 'add' ? '新增资源成功' : '修改资源成功')
      handleFormVisible()
    }
    if(action === 'add') {
      dispatch(addResource(record, callback))
    } else {
      dispatch(updateResource(record._id, record, callback))
    }
  }
  
  const handleDeleteResource = id => {
    confirm({
      title: '确认删除该条记录吗?',
      content: '删除后无法恢复',
      onOk() {
        const callback = () => {
          dispatch(getResources())
          message.success('删除成功')
        }
        dispatch(deleteResource(id, callback))
      },
      onCancel() {
        message.info('取消删除')
      },
    });
  }

  
  const resourceParents = [{ value: '', label: '顶级菜单' }].concat(createLabelAndValueTree(list))
  const stickyToolbar = <Button type="primary" onClick={() => (handleShowForm())}>新增资源</Button>
  return (
    <Layout stickyToolbar={stickyToolbar}>
      <RescourceTable
        list={list}
        handleUpdateClick={record => (handleShowForm('update', record))}
        handleDeleteClick={id => (handleDeleteResource(id))}
      />
      <ResourceForm
        title={action === 'add' ? '新增资源' : '修改资源'}
        visible={visible}
        formData={formData}
        resourceParents={resourceParents}
        handleFormVisible={() => (handleFormVisible())}
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}

Resource.getInitialProps = async (props) => {
  const { store: { dispatch } } = props.ctx
  dispatch(getResources())
  return
}

const mapStateProps = ({ resources }) => resources
export default connect(mapStateProps)(withManagerAuth(Resource))
