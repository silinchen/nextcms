import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Layout, Breadcrumb, Icon } from 'antd';
import { useRouter } from 'next/router'
import styles from './styles.less'

const MyBreadcrumb = ({ menus }) => {
  const router = useRouter()
  const { pathname } = router
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const findBreadcrumb = (data) => {
    for(let i = 0; i <= data.length - 1; i++) {
      const item = data[i]
      if(item.routePath && item.routePath === pathname ) {
        return [item]
      }
      if(item.children && item.children.length > 0) {
        const child = findBreadcrumb(item.children)
        if(child && child.length > 0) {
          return [item, ...child]
        }
      }
    }
    return []
  }

  useEffect(() => {
    setBreadcrumbs(findBreadcrumb(menus))
  }, [pathname])

  return (
    <div className={styles.breadcrumb}>
      <Breadcrumb>
        <Breadcrumb.Item><Link href="/admin"><a>首页</a></Link></Breadcrumb.Item>
        {pathname !== '/admin' && breadcrumbs.map(breadcrumb => (
          <Breadcrumb.Item key={breadcrumb._id}>
            {breadcrumb.routePath ?
              <Link href={breadcrumb.routePath}><a>{breadcrumb.name}</a></Link> :
              <span>{breadcrumb.name}</span>
            }
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  )
}

const mapStateProps = ({ manager: { menus } }) => ({ menus })

export default connect(mapStateProps)(MyBreadcrumb)
