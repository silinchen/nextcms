import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, message, Modal } from 'antd'
import Layout from '@layout/admin'
import ManagerTable from '@components/admin/manager/table'
import ManagerForm from '@components/admin/manager/form'
import { getManagers, getManagersCount, addManager, updateManager, deleteManager, getRoles } from '@store/actions'
import withManagerAuth from '@components/withManagerAuth'

const { confirm } = Modal

const defaultManager = {
  nickname: '', // 名称
  username: '', // 管理员用户名（登录）
  password: '', // 密码
  avatarUrl: '' , // 头像
  email: '', // 邮箱
  phone: '', // 手机
  enable: true, // 是否启用
  introduction: '' // 用户介绍
}

const Manager = ({ list, total, roles, loadListAndCount, dispatch }) => {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState('add')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [formData, setFormData] = useState(defaultManager)

  const params = { current, pageSize }

  const handleFormVisible = flag => (setVisible(!!flag))
  const handleShowForm = (action = 'add', record = defaultManager) => {
    setAction(action)
    setFormData({...record})
    handleFormVisible(true)
  }
  const handleSubmit = (record) => {
    const callback = () => {
      loadListAndCount(params)
      message.success(action === 'add' ? '新增管理员用户成功' : '修改管理员用户成功')
      handleFormVisible()
    }
    if(action === 'add') {
      dispatch(addManager(record, callback))
    } else {
      dispatch(updateManager(record._id, record, callback))
    }
  }
  
  const handleDeleteManager = id => {
    confirm({
      title: '确认删除该条记录吗?',
      content: '删除后无法恢复',
      onOk() {
        const callback = () => {
          loadListAndCount(params)
          message.success('删除成功')
        }
        dispatch(deleteManager(id, callback))
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
  
  const stickyToolbar = <Button type="primary" onClick={() => (handleShowForm())}>新增管理员用户</Button>
  return (
    <Layout stickyToolbar={stickyToolbar}>
      
      <ManagerTable
        list={list}
        pagination={pagination}
        handleUpdateClick={record => (handleShowForm('update', record))}
        handleDeleteClick={id => (handleDeleteManager(id))}
      />
      <ManagerForm
        action={action}
        visible={visible}
        formData={formData}
        roles={roles}
        handleFormVisible={() => (handleFormVisible())}
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}

Manager.getInitialProps = async (props) => {
  const { store: { dispatch } } = props.ctx
  dispatch(getManagers())
  dispatch(getRoles())
  dispatch(getManagersCount())
  return
}

const mapStateProps = ({ managers, roles }) => ({ ...managers, roles: roles.list })
const mapDispatchProps = dispatch => ({
  loadListAndCount(params) {
    dispatch(getManagers(params))
    dispatch(getManagersCount())
  },
  dispatch
})
export default connect(mapStateProps, mapDispatchProps)(withManagerAuth(Manager))
