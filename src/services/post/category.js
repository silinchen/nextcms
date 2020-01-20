import request from '@utils/request'
const prefix = '/posts/categories'

export const getPostsCategories = (params = {}) => (request({ url: prefix, method: 'get', params }))
export const getPostsCategoriesCount = () => (request({ url: `${prefix}/count`, method: 'get' }))
export const addPostsCategory = data => (request({ url: prefix, method: 'post', data }))
export const updatePostsCategory = (id, data) => (request({ url: `${prefix}/${id}`, method: 'put', data}))
export const deletePostsCategory = (id) => (request({ url: `${prefix}/${id}`, method: 'delete' }))
