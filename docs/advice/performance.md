# Vue 项目性能调优

## 开发环境

1、函数式组件

函数式组件, 无状态，无法实例化，内部没有任何生命周期处理方法，非常轻量，因而渲染性能高，特别适合用来只依赖外部数据传递而变化的组件。

```vue
<template functional>
  <div>
    <p v-for="(name, index) in users" @click="clickItem(name)" :key="index">
      {{ name }}
    </p>
  </div>
</template>

<script>
export default {
  name: "UserList",

  props: {
    users: Array,
    clickItem: function
  },

};
</script>
```

2、`v-if` 和 `v-show`

合理选择 `v-if` 和 `v-show` 在不同业务场景下的使用，除频繁进行显示和隐藏外建议优先使用 `v-if`。

3、`v-for` 的`key`

在数据可能会变更业务场景下，`v-for` 的`key`避免使用 `index` 作为标识

4、长列表业务

项目当中，会涉及到非常多的长列表场景，区别于普通的分页来说，大部分的前端在做这种 `无限列表` 的时候，大部分新手前端都是通过一个 `v-for` 将数据遍历出来，想的多一点的就是做一个分页。滚动到底部的时候就继续请求 `API` 。其实这也是未思考妥当的。随着数据的加载，DOM会越来越多，这样就导致了性能开销的问题产生了，当页面上的DOM太多的时候，难免给我的客户端造成一定的压力，所以对于长列表渲染的时候，建议将DOM移除掉，类似于图片懒加载的模式，只有出现在视图上的DOM才是重要的DOM。网络上有一些很好的解决方案，如 `vue-virtual-scroller` 库等等，大家可以理性的选择。

5、路由器按需加载

路由懒加载的方式有两种，一种是`require` 另一种是 `import` 。当路由按需加载后，那么Vue服务在第一次加载时的压力就能够相应的小一些，不会出现 `超长白屏P0问题` 。下面是两种路由懒加载的写法：

```javascript
// require法
component: resolve=>(require(['@/components/HelloWorld'],resolve))

// import
component: () => import('@/components/HelloWorld')
```

建议统一使用 `import` 语法。

6、按需引入

UI 组件库与其它第三方库建议按需引入，第三方库比如 `Echart`

## 生成环境

1、分块打包公共代码

将第三方库根据项目情况分块，打包成公共代码，在 Vue CLI4 中这样配置 `SplitChunksPlugin`

```javascript
module.exports = {
  chainWebpack: (config) => {
    // SplitChunksPlugin https://webpack.js.org/plugins/split-chunks-plugin/
    const splitOptions = config.optimization.get("splitChunks");
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
        automaticNameDelimiter: "~",
        // cacheGroups is an object where keys are the cache group names.
        name: true,
        cacheGroups: {
          default: false,
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial",
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          components: {
            name: "chunk-components",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 0,
            reuseExistingChunk: true,
          },
        },
      })
    );
  },
};
```

2、依赖库CDN加速

将 `Vue` `Axios` `Echarts` 等都分离出来，在正式环境下，通过 CDN 使用这些包，然后在 `vue.config.js`配置

```javascript
module.exports = {
  // 在html引入script标签后。在vue的配置中，进行声明

  configureWebpack: {
    externals: {
      echarts: "echarts", // 配置使用CDN
    },
  },
};
```



## 链接

  - [vue-9-perf-secrets](https://slides.com/akryum/vueconfus-2019)