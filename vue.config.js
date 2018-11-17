module.exports = {
  baseUrl: "./",
  devServer: {
    port: 8000,
    open: true
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('iview-loader')
        .loader('iview-loader')
        .options({
          prefix: true
        })
  }
};
