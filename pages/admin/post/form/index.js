import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { connect } from 'react-redux'
import { message, Button } from 'antd'
import Layout from '@layout/admin'
import {
  getPostsCategories, getPostsTags, getPostById,
  addPost, updatePost, resetPost
} from '@store/actions'
import withManagerAuth from '@components/withManagerAuth'

const PostFormWithNoSSR = dynamic(
  () => import('@components/admin/post/form'),
  { ssr: false }
)

const PostForm = (props) => {
  const { dispatch, action, id, post } = props

  const formRef = useRef()

  const handleSubmit = () => {
    if(!formRef.current) { return }
    formRef.current.form.validateFieldsAndScroll((err, values) => {
      if(window && window.tinyMCE && window.tinyMCE.get('post_form_content')) {
        values.wordNum = window.tinyMCE.get('post_form_content').plugins.wordcount.getCount()
      } else {
        values.wordNum = post.wordNum
      }
      if (!err) {
        const callback = () => {
          message.success(action === 'add' ? '新增文章成功' : '修改文章成功')
          if (action === 'add') {
            Router.push('/admin/post')
          }
        }
        if (action === 'add') {
          dispatch(addPost(values, callback))
        } else {
          dispatch(updatePost(id, values, callback))
        }
      }
    })
  }
  const stickyToolbar = (
    <Button type="primary" onClick={handleSubmit}>保存</Button>
  )
  return (
    <Layout stickyToolbar={stickyToolbar} conentStyle={{ padding: 24 }}>
      <PostFormWithNoSSR {...props} handleSubmit={handleSubmit} wrappedComponentRef={formRef} />
    </Layout>
  )
}

PostForm.getInitialProps = async (props) => {
  const { store: { dispatch }, query: { id } } = props.ctx
  dispatch(getPostsCategories())
  dispatch(getPostsTags())
  let action = 'add'
  if (id) {
    dispatch(getPostById(id, { fields: 'categories;tags;content;' }))
    action = 'update'
  } else {
    dispatch(resetPost())
  }
  return { action, id }
}

const mapStateProps = ({ posts }) => {
  return { 
    post: posts.posts.post,
    categories: posts.categories.list,
    tags: posts.tags.list
  }
}

export default connect(mapStateProps)(withManagerAuth(PostForm))
