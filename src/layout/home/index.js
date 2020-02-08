import Head from 'next/head'
import Container from '@components/container'
import Header from './header'
import Navbar from './navbar'
import './styles.less'

const Layout = props => {
  const { children, dropdown, title, keywords } = props
  return (
    <>
      <Head>
      <title>{title && `${title}-`}陈斯林的个人网站-技术学习、研究、分享</title>
        <meta charset="utf-8" />
        <meta name="title" content={`${(title && `${title}-`)}陈斯林的个人网站`} />
        <meta name="keyword" content={`${(keywords && `${keywords},`)}casscms,silinchen,陈斯林,个人网站,个人博客,前端,Web,网站建设,学习,研究,分享`} />
        <meta name="description" content="陈斯林的个人网站--技术学习、研究、分享"></meta>
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
