import request from '@utils/request'
const prefix = '/resources'

export const getResources = (params = {}) => (request({ url: prefix, method: 'get', params }))
export const getResourcesCount = () => (request({ url: `${prefix}/count`, method: 'get' }))
export const addResource = data => (request({ url: prefix, method: 'post', data }))
export const updateResource = (id, data) => (request({ url: `${prefix}/${id}`, method: 'put', data}))
export const deleteResource = (id) => (request({ url: `${prefix}/${id}`, method: 'delete' }))
