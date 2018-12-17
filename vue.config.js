module.exports = {
  baseUrl: "./",
  devServer: {
    port: 9000,
    open: true
  },
  lintOnSave: true,
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
