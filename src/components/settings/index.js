import { useState, useEffect } from 'react'
import { Menu, Card, Divider, Tag, Icon, Input, message } from 'antd'
import BaseView from './components/base'
import SecurityView from './components/security'
import styles from './styles.less'

const isServer = typeof window === 'undefined'

const menuMap = {
  base: '基本设置',
  security: '安全设置',
}

const UserInfo = props => {
  const { currentUser } = props
  const [mode, setMode] = useState('inline')
  const [selectKey, setSelectKey] = useState('base')

  let divDom

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize()
    return window.removeEventListener('resize', resize)
  })

  const resize = () => {
    if (!divDom) { return }
    
    let _mode = 'inline'
    const { offsetWidth } = divDom;

    if (divDom.offsetWidth < 641 && offsetWidth > 400) {
      _mode = 'horizontal';
    }

    if (window.innerWidth < 768 && offsetWidth > 400) {
      _mode = 'horizontal';
    }
    setMode(_mode)
  }

  const renderChildren = () => {
    switch (selectKey) {
      case 'base':
        return <BaseView currentUser={currentUser} />

      case 'security':
        return <SecurityView currentUser={currentUser} />;

      default:
        break;
    }
    return null;
  }
  return (
    <div className={styles.main} ref={ref => divDom = ref}>
      <div className={styles.leftMenu}>
        <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => setSelectKey(key)}>
          {Object.keys(menuMap).map(item => <Menu.Item key={item}>{menuMap[item]}</Menu.Item>)}
        </Menu>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{menuMap[selectKey]}</div>
        {renderChildren()}
      </div>
    </div>
  )
}

export default UserInfo
