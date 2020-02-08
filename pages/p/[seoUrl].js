import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Layout from '@layout/home'
import Detail from '@components/post/detail'
import { getPostBySeoUrl, postsPageViewing } from '@store/actions'

const Post = props => {
  const { post } = props
  const {title ='', tags = []} = post
  return (
    <Layout title={title} keywords={tags.map(tag => tag.name).join(',')}>
      <Detail post={post} />
    </Layout>
  )
}

Post.getInitialProps = (props) => {
  const { store: { dispatch }, query: { seoUrl } } = props.ctx
  const params = {
    fields: 'author;uauthor;content;pageView;likeNum;commentNum;tags;',
    populates: 'author;uauthor;tags;'
  }
  dispatch(getPostBySeoUrl(seoUrl, params))
  dispatch(postsPageViewing(seoUrl))
}

const mapStateProps = ({ posts: { posts: { post } }}) => ({ post })

export default connect(mapStateProps)(withRouter(Post))
