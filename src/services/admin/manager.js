import request from '@utils/request'
const prefix = '/managers'

export const getManagers = (params = {}) => (request({ url: prefix, method: 'get', params }))
export const getManagersCount = () => (request({ url: `${prefix}/count`, method: 'get' }))
export const addManager = data => (request({ url: prefix, method: 'post', data }))
export const updateManager = (id, data) => (request({ url: `${prefix}/${id}`, method: 'put', data }))
export const updateManagerInfo = (data = {}) => (request({ url: prefix, method: 'patch', data }))
export const deleteManager = (id) => (request({ url: `${prefix}/${id}`, method: 'delete' }))

export const managerLogin = data => (request({ url: `${prefix}/login`, method: 'post', data }))
export const managerLogout = () => (request({ url: `${prefix}/logout`, method: 'get' }))
export const getManagerInfo = () => (request({ url: `${prefix}/info`, method: 'get' }))
