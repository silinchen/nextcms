import request from '@utils/request'
import { obj2querystr } from '@utils'

const prefix = '/posts'

export const getPosts = (params = {}) => (request({ url: prefix, method: 'get', params }))
export const getPostsCount = () => (request({ url: `${prefix}/count`, method: 'get' }))
export const getPostById = (id, params = {}) => (request({ url: `${prefix}/${id}`, method: 'get', params }))
export const addPost = data => (request({ url: prefix, method: 'post', data }))
export const updatePost = (id, data) => (request({ url: `${prefix}/${id}`, method: 'put', data}))
export const deletePost = (id) => (request({ url: `${prefix}/${id}`, method: 'delete' }))

export const getPostBySeoUrl = (seoUrl, params = {}) => (request({ url: `${prefix}/${seoUrl}/seoUrl`, method: 'get', params }))
export const postsPageViewing = seoUrl => (request({ url: `${prefix}/pageViewing/${seoUrl}`, method: 'patch' }))
