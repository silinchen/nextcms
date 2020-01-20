import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, message, Modal } from 'antd'
import Layout from '@layout/admin'
import RoleTable from '@components/admin/role/table'
import RoleForm from '@components/admin/role/form'
import { getRoles, getRolesCount, addRole, updateRole, deleteRole, getResources } from '@store/actions'

import withManagerAuth from '@components/withManagerAuth'

const { confirm } = Modal

const defaultRole = {
  name: '', // 名称
  power: [], // 权限
  enable: true, // 是否启用
  description: '', // 描述
}

const Role = ({ list, total, loadListAndCount, dispatch, resources }) => {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState('add')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [formData, setFormData] = useState(defaultRole)

  const params = { current, pageSize }

  const handleFormVisible = flag => (setVisible(!!flag))
  const handleShowForm = (action = 'add', record = defaultRole) => {
    setAction(action)
    setFormData({...record})
    handleFormVisible(true)
  }
  const handleSubmit = (record) => {
    const callback = () => {
      loadListAndCount(params)
      message.success(action === 'add' ? '新增角色成功' : '修改角色成功')
      handleFormVisible()
    }
    if(action === 'add') {
      dispatch(addRole(record, callback))
    } else {
      dispatch(updateRole(record._id, record, callback))
    }
  }
  
  const handleDeleteRole = id => {
    confirm({
      title: '确认删除该条记录吗?',
      content: '删除后无法恢复',
      onOk() {
        const callback = () => {
          loadListAndCount(params)
          message.success('删除成功')
        }
        dispatch(deleteRole(id, callback))
      },
      onCancel() {
        message.info('取消删除')
      },
    });
  }

  // 分页页面
  function onShowSizeChange(page, size) {
    if(size !== pageSize) {
      setCurrent(1)
      setPageSize(size)
    }
  }
  const onChange = (page) => {
    setCurrent(page)
  }
  useEffect(() => {
    loadListAndCount(params)
  }, [current, pageSize])

  const pagination = {
    total,
    current,
    pageSize,
    showSizeChanger: true,
    onChange,
    onShowSizeChange
  }
  
  const stickyToolbar = <Button type="primary" onClick={() => (handleShowForm())}>新增角色</Button>
  return (
    <Layout stickyToolbar={stickyToolbar}>
      <RoleTable
        list={list}
        pagination={pagination}
        handleUpdateClick={record => (handleShowForm('update', record))}
        handleDeleteClick={id => (handleDeleteRole(id))}
      />
      <RoleForm
        action={action}
        visible={visible}
        resources={resources}
        formData={formData}
        handleFormVisible={() => (handleFormVisible())}
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}

Role.getInitialProps = async (props) => {

  const { store: { dispatch, getState } } = props.ctx
  const token = getState().manager.token

  dispatch(getRoles())
  dispatch(getRolesCount())
  dispatch(getResources())
  return
}

const mapStateProps = ({ roles, resources }) => ({ ...roles, resources: resources.list })
const mapDispatchProps = dispatch => ({
  loadListAndCount(params) {
    dispatch(getRoles(params))
    dispatch(getRolesCount())
  },
  dispatch
})
// export default connect(mapStateProps, mapDispatchProps)(Role)
export default connect(mapStateProps, mapDispatchProps)(withManagerAuth(Role))
