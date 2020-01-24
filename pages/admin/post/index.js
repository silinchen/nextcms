import { useState } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { message, Button, Modal } from 'antd'
import Layout from '@layout/admin'
import PostTable from '@components/admin/post/post/table'
import { getPosts, getPostsCount, deletePost } from '@store/actions'
import withManagerAuth from '@components/withManagerAuth'

const { confirm } = Modal

const qurey = { fields: 'author;uauthor;categories;tags;pageView;likeNum;', populates: 'author;uauthor;categories;tags;' }

const Post = ({ list, total, loadListAndCount, dispatch }) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const params = { current, pageSize, ...qurey }

  const handleDeletePost = id => {
    confirm({
      title: '确认删除该条记录吗?',
      content: '删除后无法恢复',
      onOk() {
        const callback = () => {
          loadListAndCount(params)
          message.success('删除成功')
        }
        dispatch(deletePost(id, callback))
      },
      onCancel() {
        message.info('取消删除')
      },
    });
  }

  // 分页页面
  function onShowSizeChange(page, size) {
    if(size !== pageSize) {
      setCurrent(page)
      setPageSize(size)
      loadListAndCount(params)
    }
  }
  const onChange = page => {
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
  const stickyToolbar = (
    <Link href="/admin/post/form">
      <Button type="primary">新增文章</Button>
    </Link>
  )
  return (
    <Layout stickyToolbar={stickyToolbar}>
      <PostTable
        posts={list}
        pagination={pagination}
        handleDeletePostClick={id => (handleDeletePost(id))}
      />
    </Layout>
  )
}

Post.getInitialProps = async (props) => {
  const { store: { dispatch }, isServer } = props.ctx
  dispatch(getPosts(qurey))
  dispatch(getPostsCount())
  return { isServer }
}

const mapStateProps = ({ posts: { posts } }) => posts
const mapDispatchProps = dispatch => ({
  loadListAndCount(params) {
    dispatch(getPosts(params))
    dispatch(getPostsCount())
  },
  dispatch
})
export default connect(mapStateProps, mapDispatchProps)(withManagerAuth(Post))
