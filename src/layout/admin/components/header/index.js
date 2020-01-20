import { Layout, Icon } from 'antd';
import MyBreadcrumb from './breadcrumb'
import Screenfull from './screenfull'
import AvatarDropdown from './avatarDropdown'
import styles from './styles.less'
const { Header } = Layout;

export default ({ collapsed, toggle }) => (
  <Header className={styles.header}>
    <Icon
      className={styles.trigger}
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={toggle}
    />
    <MyBreadcrumb />
    <div className={styles.right__menus}>
      <Screenfull />
      <AvatarDropdown />
    </div>
  </Header>
)
