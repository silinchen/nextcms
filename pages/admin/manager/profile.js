import { connect } from 'react-redux'
import { Row, Col, Card } from 'antd'
import Layout from '@layout/admin'
import { getPosts, updateManagerTags } from '@store/actions'
import withManagerAuth from '@components/withManagerAuth'
import Posts from '@components/post/list'
import UserInfo from '@components/userInfo'

const ManagerProfile = ({ posts = [], manager, dispatch }) => {
  const handleUpdateManagerTags = tags => {
    dispatch(updateManagerTags(tags))
  }
  
  return (  
    <Layout conentStyle={{ background: 'transparent' }}>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <UserInfo currentUser={manager} handleUpdateManagerTags={handleUpdateManagerTags} />
        </Col>
        <Col lg={17} md={24}>
          <Card title="文章" bordered={false}>
            <Posts list={posts} />
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

ManagerProfile.getInitialProps = async (props) => {
  const { store: { dispatch } } = props.ctx
  const params = {
    fields: 'author;pageView;likeNum;commentNum;',
    populates: 'author',
  }
  dispatch(getPosts(params))
  return
}

const mapStateProps = ({ posts: { posts }, manager }) => ({ posts:posts.list, manager })
export default connect(mapStateProps)(withManagerAuth(ManagerProfile))
