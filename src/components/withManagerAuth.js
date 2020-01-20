import React from 'react'
import Router from 'next/router'
import { getToken, setToken, removeToken } from '@utils/auth'
import { getManagerInfo, setSideBarOpenKeys } from '@store/actions'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default Comp => {
  const WithManagerAuth = (props) => <Comp {...props} />

  WithManagerAuth.getInitialProps = async props => {
    const { store: { dispatch, getState }, req, isServer, pathname } = props.ctx
    const token = isServer ? req.ctx.cookies.get(publicRuntimeConfig.tokenKey) : getToken()
    const redirectToLogin = () => {
      removeToken(token)
      if(isServer) {
        // 清除 token
        req.ctx.cookies.set('C-Token','', { signed: false, maxAge: 0 })
        return req.ctx.redirect('/admin/login')
      } else {
        return Router.push('/admin/login')
      }
    }
    if (!token) {
      return redirectToLogin()
    } else {
      if(isServer) {
        try {
          const { jwtAuth, hasPower } = serverRuntimeConfig
          // 校验 token， 验证权限
          jwtAuth && await jwtAuth(req.ctx, function() {})
          req.ctx.state.powerType = 1 // 功能菜单
          hasPower && await hasPower(req.ctx, function() {})
          // 服务端缓存 token，给 axios 请求的时候可以使用，代理报文头 authtication。
          setToken(token)
        } catch (error) {
          return redirectToLogin()
        }
      }
      const menus = getState().manager.menus
      if(!menus || menus.length === 0) {
        const callback = menusTree => {
          const menu = menusTree.find(({ children }) => {
            return children ? children.find(({ routePath }) => routePath === pathname) : false
          })
          if(menu) {
            dispatch(setSideBarOpenKeys([menu._id]))
          }
        }
        // 请求错误处理
        const errorCallback = ({ status }) => {
          // token 验证失败，没有权限
          if(status === 401) { return redirectToLogin() }
        }
        await dispatch(getManagerInfo(callback, errorCallback))
      }
    }
    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(props)
    }
    return { ...appProps }
  }
  return WithManagerAuth
}
