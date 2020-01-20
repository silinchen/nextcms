import Layout from '@layout/admin'
import withManagerAuth from '@components/withManagerAuth'

const Admin = () => (
  <Layout>
    admin home
  </Layout>
)

export default withManagerAuth(Admin)
