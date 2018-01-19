'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://apitest.ibabygroup.cn"',
  BASE_API2: '"http://apitest.ibabygroup.cn"'
})
