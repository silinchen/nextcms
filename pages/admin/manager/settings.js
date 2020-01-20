import { connect } from 'react-redux'
import { Row, Col, Card } from 'antd'
import Layout from '@layout/admin'
import { getPosts, updateManagerTags } from '@store/actions'
import withManagerAuth from '@components/withManagerAuth'
import Settings from '@components/settings'
const ManagerSettings = ({ manager, dispatch }) => {
  return (  
    <Layout>
      <Settings currentUser={manager} />
    </Layout>
  )
}

const mapStateProps = ({ manager }) => ({ manager })
export default connect(mapStateProps)(withManagerAuth(ManagerSettings))
