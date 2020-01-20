import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { message, Button, Modal } from 'antd'
import Layout from '@layout/admin'
import TagTable from '@components/admin/post/tag/table'
import TagForm from '@components/admin/post/tag/form'
import { getPostsTags, getPostsTagsCount, addPostsTag, updatePostsTag, deletePostsTag } from '@store/actions'
import withManagerAuth from '@components/withManagerAuth'

const { confirm } = Modal

const defaultTag = {
  name: '',
  description: ''
}

const Tag = ({ list, total, loadListAndCount, dispatch }) => {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState('add')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [tag, setTag] = useState(defaultTag)

  const params = { current, pageSize }

  const handleFormVisible = flag => (setVisible(!!flag))
  const handleShowForm = (action = 'add', record = defaultTag) => {
    setAction(action)
    setTag({...record})
    handleFormVisible(true)
  }
  const handleSubmit = (record) => {
    const callback = () => {
      loadListAndCount(params)
      message.success(action === 'add' ? '新增类别成功' : '修改类别成功')
      handleFormVisible()
    }
    if(action === 'add') {
      dispatch(addPostsTag(record, callback))
    } else {
      dispatch(updatePostsTag(record._id, record, callback))
    }
  }
  
  const handleDeleteTag = id => {
    confirm({
      title: '确认删除该条记录吗?',
      content: '删除后无法恢复',
      onOk() {
        const callback = () => {
          loadListAndCount(params)
          message.success('删除成功')
        }
        dispatch(deletePostsTag(id, callback))
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
  
  const stickyToolbar = <Button type="primary" onClick={() => {handleShowForm()}}>新增标签</Button>
  return (
    <Layout stickyToolbar={stickyToolbar}>
      <TagTable
        tags={list}
        pagination={pagination}
        handleUpdateTagClick={record => (handleShowForm('update', record))}
        handleDeleteTagClick={id => (handleDeleteTag(id))}
      />
      <TagForm
        title={action === 'add' ? '新增文章类别' : '修改文章类别'}
        visible={visible}
        tag={tag}
        handleFormVisible={() => (handleFormVisible())}
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}

Tag.getInitialProps = async (props) => {
  const { store: { dispatch } } = props.ctx
  dispatch(getPostsTags())
  dispatch(getPostsTagsCount())
  return
}

const mapStateProps = ({ posts: { tags } }) => tags
const mapDispatchProps = dispatch => ({
  loadListAndCount(params) {
    dispatch(getPostsTags(params))
    dispatch(getPostsTagsCount())
  },
  dispatch
})
export default connect(mapStateProps, mapDispatchProps)(withManagerAuth(Tag))
