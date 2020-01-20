import { Menu, Icon } from 'antd'
import Link from 'next/link'

const { SubMenu } = Menu

const SiderItem = (props) => {
  const { name, icon, routePath, children } = props.item
  if(children && children.length > 1) {
    return (
      <SubMenu
        {...props}
        title={
          <span>
            <Icon type={icon} />
            <span>{name}</span>
          </span>
        }
      >
        {children.map(child => {
          return (<SiderItem key={child.routePath} item={child} />)
        })}
      </SubMenu>
    )
  } else {
    const renderItem = (path, icon, name) => {
      return (
        <Menu.Item {...props}>
          <Link href={path || ''} >
            <span>
              <Icon type={icon} />
              <span>{name}</span>
            </span>
          </Link>
        </Menu.Item>
      )
    }
    if(children && children.length === 1) {
      const { routePath, icon, name } = children[0]
      return renderItem(routePath, icon, name)
    }
    return renderItem(routePath, icon, name)
  }
}

export default SiderItem
