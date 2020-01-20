import request from '@utils/request'
import { obj2querystr } from '@utils'

const prefix = '/upload'

export const precheck = filename => (request({ url: `${prefix}/precheck/${filename}`, method: 'get' }))
