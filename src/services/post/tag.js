import request from '@utils/request'
const prefix = '/posts/tags'

export const getPostsTags = (params = {}) => (request({ url: prefix, method: 'get', params }))
export const getPostsTagsCount = () => (request({ url: `${prefix}/count`, method: 'get' }))
export const addPostsTag = data => (request({ url: prefix, method: 'post', data }))
export const updatePostsTag = (id, data) => (request({ url: `${prefix}/${id}`, method: 'put', data}))
export const deletePostsTag = (id) => (request({ url: `${prefix}/${id}`, method: 'delete' }))
