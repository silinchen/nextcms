import { connect } from 'react-redux'
import Layout from '@layout/home'
import Posts from '@components/post/list'
import Sidebar from '@components/index/sidebar'
import Dropdown from '@components/index/dropdown'
import { getPosts, getPostsCategories } from '@store/actions'
import styles from '@components/index/styles.less'

const Home = ({ posts, categories }) => (
  <Layout dropdown={<Dropdown categories={categories} />} >
    <div className={styles.main}>
      <div className={styles.content}>
        {/* <img src="" alt="" /> */}
        <Posts list={posts} />
      </div>
      <Sidebar categories={categories} />
    </div>
  </Layout>
)

Home.getInitialProps = async props => {
  const { store: { dispatch }, query: { cateSeoUrl, keyword } } = props.ctx
  const params = {
    fields: 'author;uauthor;pageView;likeNum;commentNum;',
    populates: 'author;uauthor;',
    cateSeoUrl,
    keyword
  }
  dispatch(getPosts(params))
  dispatch(getPostsCategories())
  return
}

const mapStateProps = ({ posts: { posts, categories, tags } }) => {
  return { posts:posts.list, categories:categories.list, tags:tags.list }
}
export default connect(mapStateProps)(Home)
