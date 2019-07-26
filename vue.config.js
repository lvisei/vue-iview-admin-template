const path = require('path')

const resolve = dir => path.join(__dirname, '.', dir)

module.exports = {
  devServer: {
    port: 9000,
    open: true
  },
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons/svg'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('iview-loader')
      .loader('iview-loader')
      .options({
        prefix: true
      })
  }
}
