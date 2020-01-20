import { useState, useEffect, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { Layout, Menu, Icon } from 'antd'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { setSideBarOpenKeys, setSideBarSelectKeys } from '@store/actions'
import SiderItem from './siderBarItem'
import styles from './styles.less'
import { createTree } from '@utils'

const ScrollAreaWithNoSSR = dynamic(
  () => import('react-scrollbar'),
  { ssr: false }
)

const { Sider } = Layout

const SiderBar = ({ dispatch, collapsed, menus, sideBarOpenKeys = [], sideBarSelectKeys = [] }) => {
  const router = useRouter()
  const { pathname } = router

  useEffect(() => {
    dispatch(setSideBarSelectKeys([pathname || '']))
  }, [pathname])
  
  const handleOpenChange = openKeys => {
    dispatch(setSideBarOpenKeys(openKeys))
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={styles.sider}
      width={240}
    >
      <Link href="/admin">
        <div className={styles.logo__wrapper}>
          <span>{collapsed ? 'C' : '后台管理系统'}</span> :
        </div>
      </Link>
      <ScrollAreaWithNoSSR
        speed={0.5}
        className={styles.menu__wrapper}
        horizontal={false}
      >
        <Menu
          theme="dark"
          mode="inline"
          openKeys={sideBarOpenKeys}
          selectedKeys={sideBarSelectKeys}
          onOpenChange={handleOpenChange}
        >
          {menus.map(item => (
            <SiderItem key={item._id} item={item} />
          ))}
        </Menu>
      </ScrollAreaWithNoSSR>
    </Sider>
  )
}

const mapStateProps = ({ manager: { menus }, app: { sideBarOpenKeys, sideBarSelectKeys} }) => {
  return { menus, sideBarOpenKeys, sideBarSelectKeys }
}

export default connect(mapStateProps)(SiderBar)
