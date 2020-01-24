import { connect } from 'react-redux'
import Layout from '@layout/home'
import Posts from '@components/post/list'
import Sidebar from '@components/index/sidebar'
import Dropdown from '@components/index/dropdown'
import { getPosts, getPostsCategories } from '@store/actions'
import styles from '@components/index/styles.less'
import Router from 'next/router'

const Home = props => {
  const { posts, categories, cateSeoUrl, isSearch } = props
  const cate = categories.find(cate => cate.seoUrl === cateSeoUrl)

  const emptyConent = (
    <div className={styles.emptyContent}>{isSearch ? '未找到相应的文章～' : '暂无文章～'}</div>
  )

  return (
    <Layout dropdown={<Dropdown categories={categories} />} title={cate && cate.name}>
      <div className={styles.main}>
        <div className={styles.content}>
          {/* <img src="" alt="" /> */}
          {posts.length > 0 ? <Posts list={posts} /> : emptyConent}
        </div>
        <Sidebar categories={categories} />
      </div>
    </Layout>
  )
}

Home.getInitialProps = async props => {
  const { store: { dispatch }, query: { cateSeoUrl, q }, isServer, pathname, req } = props.ctx
  const isSearch = pathname === '/search' && typeof q === 'string'
  // 如果搜索内容为空
  if(isSearch && q.length === 0) {
    if(isServer) {
      req.ctx.redirect('/')
    } else {
      Router.push('/')
    }
    return
  }

  const params = {
    fields: 'author;uauthor;pageView;likeNum;commentNum;',
    populates: 'author;uauthor;',
    cateSeoUrl,
    q
  }
  dispatch(getPosts(params))
  dispatch(getPostsCategories())
  return { cateSeoUrl, isSearch }
}

const mapStateProps = ({ posts: { posts, categories, tags } }) => {
  return { posts:posts.list, categories:categories.list, tags:tags.list }
}
export default connect(mapStateProps)(Home)
