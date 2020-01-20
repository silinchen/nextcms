import { useState } from 'react'
import { Layout, Affix } from 'antd';
import Sticky from '@components/sticky'
import SiderBar from './components/siderBar'
import Header from './components/header'
import Footer from './components/footer'
import styles from './styles.less'
const { Content } = Layout;

const AdminLayout = ({ children, conentStyle = {}, stickyToolbar }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed)
  }
  
  return (
    <Layout>
      <SiderBar collapsed={collapsed} />
      <Layout style={{ marginLeft: collapsed ? 80 : 240 }}>
        <Header collapsed={collapsed} toggle={toggle} />
        {stickyToolbar &&
          <Affix>
            <div className={styles.sticky__toolbar}>
              {stickyToolbar}
            </div>
          </Affix>
        }
        <Content className={styles.content} style={conentStyle}>
          {children}
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
