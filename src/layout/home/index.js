import Head from 'next/head'
import Container from '@components/container'
import Header from './header'
import Navbar from './navbar'
import './styles.less'

const Layout = props => {
  const { children, dropdown, title } = props
  return (
    <>
      <Head>
      <title>{title && `${title}-`}陈斯林的个人网站</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        { !process.env.dev &&
          <script dangerouslySetInnerHTML = {{ __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?c5fcc556cd26dbe1115fbf17b7b844db";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `}} />
        }
      </Head>
      <Header>
        <Navbar />
        {dropdown}
      </Header>
      <Container>
        {children}
      </Container>
    </>
  )
}
export default Layout
