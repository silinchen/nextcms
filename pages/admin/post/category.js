import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { message, Modal, Button } from 'antd'
import Layout from '@layout/admin'
import CategoryTable from '@components/admin/post/category/table'
import CategoryForm from '@components/admin/post/category/form'
import { getPostsCategories, getPostsCategoriesCount, addPostsCategory, updatePostsCategory, deletePostsCategory } from '@store/actions'
import withManagerAuth from '@components/withManagerAuth'
import { createLabelAndValueTree, createTree } from '@utils'
const { confirm } = Modal

const defaultCategory = {
  parentId: [''],
  name: '',
  enable: true,
  sort: 0,
  seoUrl: '',
  description: ''
}

const Category = ({ list, total, loadListAndCount, dispatch }) => {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState('add')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [category, setCategory] = useState(defaultCategory)

  const params = { current, pageSize }

  const handleFormVisible = flag => (setVisible(!!flag))
  const handleShowForm = (action = 'add', record = defaultCategory) => {
    setAction(action)
    setCategory({...record})
    handleFormVisible(true)
  }
  const handleSubmit = (record) => {
    const callback = () => {
      loadListAndCount(params)
      message.success(action === 'add' ? '新增类别成功' : '修改类别成功')
      handleFormVisible()
    }
    if(action === 'add') {
      dispatch(addPostsCategory(record, callback))
    } else {
      dispatch(updatePostsCategory(record._id, record, callback))
    }
  }
  
  const handleDeleteCategory = id => {
    confirm({
      title: '确认删除该条记录吗?',
      content: '删除后无法恢复',
      onOk() {
        const callback = () => {
          loadListAndCount(params)
          message.success('删除成功')
        }
        dispatch(deletePostsCategory(id, callback))
      },
      onCancel() {
        message.info('取消删除')
      },
    });
  }

  // 分页页面
  const onShowSizeChange = (page, size) => {
    if(size !== pageSize) {
      setCurrent(1)
      setPageSize(size)
      loadListAndCount(params)
    }
  }
  const onChange = (page) => {
    setCurrent(page)
    loadListAndCount(params)
  }
  const pagination = {
    total,
    current,
    pageSize,
    showSizeChanger: true,
    onChange,
    onShowSizeChange
  }
  
  const categoryParents = [{ value: '', label: '顶级类别' }].concat(createLabelAndValueTree(list))
  const stickyToolbar = <Button type="primary" onClick={() => {handleShowForm()}}>新增类别</Button>
  return (
    <Layout stickyToolbar={stickyToolbar}>
      <CategoryTable
        list={createTree(list)}
        pagination={pagination}
        handleUpdateCategoryClick={record => (handleShowForm('update', record))}
        handleDeleteCategoryClick={id => (handleDeleteCategory(id))}
      />
      <CategoryForm
        title={action === 'add' ? '新增文章类别' : '修改文章类别'}
        visible={visible}
        category={category}
        categoryParents={categoryParents}
        handleFormVisible={() => (handleFormVisible())}
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}

Category.getInitialProps = async (props) => {
  const { store: { dispatch } } = props.ctx
  dispatch(getPostsCategories())
  dispatch(getPostsCategoriesCount())
  return
}

const mapStateProps = ({ posts: { categories } }) => categories
const mapDispatchProps = dispatch => ({
  loadListAndCount(params) {
    dispatch(getPostsCategories(params))
    dispatch(getPostsCategoriesCount())
  },
  dispatch
})
export default connect(mapStateProps, mapDispatchProps)(withManagerAuth(Category))
