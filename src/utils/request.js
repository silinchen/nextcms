/**
 * Created by csl
 * 网络请求工具
 */
import axios from 'axios'
import { getToken, removeToken } from './auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const isServer = typeof window === 'undefined'

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
})

// request interceptor
request.interceptors.request.use(
  config => {
    const token = getToken('C-Token')
    if(token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    if('development' === process.env.NODE_ENV) {
      console.log(error) // for debug
    }
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  ({ data }) => {
    return data
  },
  error => {
    const { response = {} } = error
    // data 为接口返回的数据
    const { data, status, message, config } = response
    if('development' === process.env.NODE_ENV) {
      console.log(isServer ? { status, message, ...data } : error) // for debug
    }
    if (!isServer) {
      toast(
        <div>
          <h4>请求错误 code：{status}</h4>
          { config && config.url &&
            <p style={{ marginBottom: 5 }}>{config.url}</p>
          }
          <p>{data.message || message}</p>
        </div>
      )
    }
    
    return Promise.reject({ status, message, ...data })
  }
)

export default request
