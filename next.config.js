const path = require('path')
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const { jwtAuth, hasPower } = require('./server/middleware')
const { tokenKey } = require('./server/config')

const dev = process.env.NODE_ENV !== 'production'

// https://github.com/zeit/next-plugins/tree/master/packages/next-less
// https://github.com/zeit/next.js/issues/5180
// 使支持 less + css Modules
module.exports = withBundleAnalyzer(withLess({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[folder]_[local]___[hash:base64:5]",
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  // https://github.com/zeit/next.js/tree/master/examples/with-ant-design
  // 主要为了加载 antd 的 css， 配合 .babelrc 里面的配置实现
  ...withCss({
    env: {
      dev,
      REACT_APP_BASE_API: dev ? 'http://localhost:3000/api' : 'https://silinchen.com/api'
    },
    webpack: (config, options) => {
      // 修改默认的 alias
      config.resolve.alias = {
        '@components': path.join(__dirname, './src/components'),
        '@layout': path.join(__dirname, './src/layout'),
        '@services': path.join(__dirname, './src/services'),
        '@store': path.join(__dirname, './src/store'),
        '@utils': path.join(__dirname, './src/utils'),
        ...config.resolve.alias
      }
      config.optimization.splitChunks.cacheGroups = {
        // 把只在后台用的大部分依赖单独打包，减少首页公用 js 文件大小
        adminlib: {
          name: 'adminlib',
          test: /[\\/]node_modules[\\/](antd|@ant-design|moment|async-validator|rc-.*|elliptic|bn.js|readable-stream|asn1.js|buffer|hash.js|lodash|dom-align|tinycolor2|sha.js|diffie-hellman|browserify-sign|parse-asn1|semver|dom-scroll-into-view|des.js|mini-store|util|css-animation|create-react-class|add-dom-event-listener|events|resize-observer-polyfill|node-libs-browser|mutationobserver-shim|babel-runtime|pbkdf2|jwa|jws|public-encrypt|md5.js|screenfull|)[\\/]/,
          priority: 20,
          // chunks: 'all',
          // enforce: true
        },
        ...config.optimization.splitChunks.cacheGroups
      }
      if (options.isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]
  
        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
      } else {
        // 忽略 MiniCssExtractPlugin 引入 css 因排序问题导致的警告信息
        config.plugins.push(new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        }))
      }
      return config
    },
    // 打包分析相关配置
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    // 只在服务端可以访问的参数
    serverRuntimeConfig: {
      // Will only be available on the server side
      jwtAuth,
      hasPower
    },
    // 浏览器端跟服务端都可以访问的参数
    publicRuntimeConfig: {
      tokenKey
    }
  })
}))