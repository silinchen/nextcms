import { useState, useEffect } from 'react'
import { Layout, Affix } from 'antd'
import Head from 'next/head'
import { CSSTransition } from 'react-transition-group'
import SiderBar from './components/siderBar'
import Header from './components/header'
import Footer from './components/footer'
import styles from './styles.less'
import transition from './transition.less'

const { Content } = Layout;

const AdminLayout = ({ children, conentStyle = {}, stickyToolbar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed)
  }
  useEffect(() => {
    setShow(true)
    return () => {
      setShow(false)
    }
  }, [])
  return (
    <>
      <Head>
        <title>陈斯林的网站管理后台</title>
      </Head>
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
          <CSSTransition
            in={show}
            timeout={500}
            classNames={{ ...transition }}
          >
            <Content className={styles.content} style={conentStyle}>
              {children}
            </Content>
          </CSSTransition>
          <Footer />
        </Layout>
      </Layout>
    </>
  )
}

export default AdminLayout
