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

7、延时渲染

当遇到渲染耗时的组件，使用延时渲染的方式做渐进式渲染，它能避免一次 render 由于 JS 执行时间过长导致渲染卡住的现象。

```vue
<template>
  <div class="deferred-on">
    <VueIcon icon="fitness_center" class="gigantic"/>

    <h2>I'm an heavy page</h2>

    <template v-if="defer(2)">
      <Heavy v-for="n in 8" :key="n"/>
    </template>

    <Heavy v-if="defer(3)" class="super-heavy" :n="9999999"/>
  </div>
</template>

<script>
import Defer from '@/mixins/Defer'

export default {
  mixins: [
    Defer(),
  ],
}
</script>

```

Defer 这个 mixin 代码

```js
export default function (count = 10) {
  return {
    data () {
      return {
        displayPriority: 0
      }
    },

    mounted () {
      this.runDisplayPriority()
    },

    methods: {
      runDisplayPriority () {
        const step = () => {
          requestAnimationFrame(() => {
            this.displayPriority++
            if (this.displayPriority < count) {
              step()
            }
          })
        }
        step()
      },

      defer (priority) {
        return this.displayPriority >= priority
      }
    }
  }
}
```


8、 时间分片

JS是单线程，当遇到数据量较大的处理时，JS 执行时间过长，会阻塞 UI 线程的响应，如果时间片切割技术来分批次处理可以避免页面卡死的情况。

```js
async function work (list, splitCount) {
  const queue = new JobQueue()
  splitArray(list, splitCount).forEach(
    chunk => queue.addJob(done => {
      // 分时间片提交数据
      requestAnimationFrame(() => {
        commit('addItems', chunk)
        done()
      })
    })
  )
  await queue.start()
}

function splitArray (list, chunkLength) {
  const chunks = []
  let chunk = []
  let i = 0
  let l = 0
  let n = list.length
  while (i < n) {
    chunk.push(list[i])
    l++
    if (l === chunkLength) {
      chunks.push(chunk)
      chunk = []
      l = 0
    }
    i++
  }
  chunk.length && chunks.push(chunk)
  return chunks
}
```

<details>
<summary>JobQueue</summary>

```js
class JobQueue {
  constructor ({ autoStart = false } = {}) {
    this.autoStart = autoStart

    this._queue = []
    this._running = false
    this._results = []
    this._resolves = []
    this._rejects = []
    this._runId = 0
  }

  get length () {
    return this._queue.length
  }

  addJob (func) {
    this._queue.push(async () => {
      try {
        const runId = this._runId
        const result = func(() => {
          // Run not cancelled
          if (runId === this._runId) {
            this._results.push(result)
            this._next()
          }
        })
      } catch (error) {
        this._reject(error)
      }
    })

    if (this.autoStart && this.length === 1) {
      this.start()
    }
  }

  clear () {
    this._running = false
    this._queue.length = 0
    this._resolves.length = 0
    this._rejects.length = 0
    this._results.length = 0
    this._runId++
  }

  cancel () {
    this._resolve()
    this.clear()
  }

  start () {
    return new Promise((resolve, reject) => {
      if (!this._running && this.length > 0) {
        this._running = true
        this._queue[0]()
        this._resolves.push(resolve)
        this._rejects.push(reject)
      } else {
        resolve()
      }
    })
  }

  _next () {
    if (this._running && this.length > 0) {
      this._queue.shift()

      if (this.length === 0) {
        this._resolve()
      } else {
        this._queue[0]()
      }
    }
  }

  _resolve () {
    this._resolves.forEach(f => f(this._results))
    this.clear()
  }

  _reject (error) {
    this._rejects.forEach(f => f(error))
    this.clear()
  }
}
```
</details>


9、  非响应式数据

对于不需要响应式的变量，应避免进行数据劫持。

复杂嵌套的对象：

```js
const data = list.map(
  item => optimizeItem(item)
)

function optimizeItem (item) {
  const itemData = {
    id: uid++,
    vote: 0
  }
  Object.defineProperty(itemData, 'data', {
    // 标记为非响应式
    configurable: false,
    value: item
  })
  // 或者
  // itemData['data'] = Object.freeze(item)
  return itemData
}
```


比如实例对象：
```js
export default {
  created() {
    this.scroll = null
  },
  mounted() {
    this.scroll = new BScroll(this.$el)
  }
}
```



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
  - [揭秘 Vue.js 九个性能优化技巧](https://juejin.cn/post/6922641008106668045)