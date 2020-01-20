const jwt = require('koa-jwt')
const { tokenSecret: secret } = require('../config')

const jwtauth = jwt({ secret, cookie: 'C-Token', debug: process.env.NODE_ENV !== 'production' })

module.exports = jwtauth