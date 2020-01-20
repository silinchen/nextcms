import Cookies from 'js-cookie'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const defaultTokenKey = publicRuntimeConfig.tokenKey
const isServer = typeof window === 'undefined'

// 缓存 tokens，方便 axios 在服务器请求的时候取 tokens，进行 headers 代理
let tokens = {}

export function getToken() {
  if(isServer) {
    return tokens[defaultTokenKey]
  } else {
    return Cookies.get(defaultTokenKey)
  }
}

export function setToken(token) {
  tokens[defaultTokenKey] = token
  return Cookies.set(defaultTokenKey, token)
}

export function removeToken() {
  delete tokens[defaultTokenKey]
  return Cookies.remove(defaultTokenKey)
}
