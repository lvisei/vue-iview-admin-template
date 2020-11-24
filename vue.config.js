const path = require('path')
const defaultSettings = require('./src/config')
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

const siteName = defaultSettings.siteName || 'vue-iview-admin-template'
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    port: 9000,
    open: true
  },
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "~@/themes/variables.less";`
        },
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = siteName
      return args
    })

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

    // SplitChunksPlugin https://webpack.js.org/plugins/split-chunks-plugin/
    const splitOptions = config.optimization.get('splitChunks')
    config.optimization.splitChunks(
      Object.assign({}, splitOptions, {
        // （缺省值5）按需加载时的最大并行请求数
        maxAsyncRequests: 16,
        // （默认值3）入口点上的最大并行请求数
        maxInitialRequests: 16,
        // （默认值：1）分割前共享模块的最小块数
        minChunks: 1,
        // （默认值：30000）块的最小大小
        minSize: 30000,
        // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
        automaticNameDelimiter: '~',
        // cacheGroups is an object where keys are the cache group names.
        name: true,
        cacheGroups: {
          default: false,
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 8,
            minSize: 0,
            // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
            priority: 1,
            reuseExistingChunk: true
          },
          // vendors: {
          //   name: 'chunk-vendors',
          //   test: /[\\/]node_modules[\\/]/,
          //   chunks: 'initial',
          //   priority: 2,
          //   reuseExistingChunk: true
          // },
          viewDesign: {
            name: 'chunk-view-design',
            test: /[\\/]node_modules[\\/]view-design[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true
          },
          components: {
            name: 'chunk-components',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 0,
            reuseExistingChunk: true
          },
          monacoEditor: {
            name: 'chunk-monaco-editor',
            test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
            chunks: 'all',
            priority: 4
          },
          cesium: {
            name: 'chunk-cesium',
            test: /[\\/]node_modules[\\/]cesium[\\/]/,
            chunks: 'all',
            priority: 5
          }
        }
      })
    )
  },
  configureWebpack: config => {
    const plugins = [
      new MonacoEditorPlugin({
        // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        // Include a subset of languages support
        // Some language extensions like typescript are so huge that may impact build performance
        // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
        // Languages are loaded on demand at runtime
        languages: ['json', 'html']
      })
    ]
    return {
      plugins: plugins
    }
  }
}
