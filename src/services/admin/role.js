import request from '@utils/request'
const prefix = '/roles'

export const getRoles = (params = {}) => (request({ url: prefix, method: 'get', params }))
export const getRolesCount = () => (request({ url: `${prefix}/count`, method: 'get' }))
export const addRole = data => (request({ url: prefix, method: 'post', data }))
export const updateRole = (id, data) => (request({ url: `${prefix}/${id}`, method: 'put', data }))
export const deleteRole = id => (request({ url: `${prefix}/${id}`, method: 'delete' }))
