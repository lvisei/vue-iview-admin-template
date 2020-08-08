# 结构约定

_文件目录结构化、项目业务模块化、文件结构遵循就近原则_

## 1. JS 文件

所有的 `.js` 文件都遵循横线连接 `kebab-case`。

例子：

- `@/src/utils/open-window.js`
- `@/src/components/SvgIcon/require-icons.js`
- `@/src/views/LeafletMap/default-options.js`

## 2. components 与 views

所有的 `components` 文件都是以大写开头 `PascalCase`，这也是官方所 [推荐的](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)。

但除了 `index.vue`。

例子：

- `@/src/components/BackToTop/index.vue`
- `@/src/components/Charts/Line.vue`
- `@/src/views/LeafletMap/MapContainer/index.vue`

`components` 与 `views` 的区别在于组件本身是否是系统业务组件，`views` 可理解为各模块页面公用的路由视图组件，`component` 则是脱离系统业务的公用组件。

## 3. pages

在 `pages` 目录下，代表路由的 `.vue` 文件都使用横线连接 `kebab-case`，代表路由的文件夹也是使用同样的规则。

例子：

- `@/src/pages/data-query/index.vue`
- `@/src/pages/data-query/helper.js`
- `@/src/pages/data-query/components/BarChart.vue`

使用横线连接 (kebab-case)来命名`pages`主要是出于以下几个考虑。

- 横线连接 (kebab-case) 也是官方推荐的命名规范之一 [文档](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

- `pages`下的`.vue`文件代表的是一个路由，所以它需要和 `component` 进行区分，`component` 都是大写开头

- 页面的`url` 也都是横线连接的，比如`https://www.xxx.com/user-management`，所以路由对应的`pages`应该要保持统一

- 没有大小写敏感问题

各路由组件的子组件文件与其他文件结构遵循就近原则。

若路由组件有子组件，子组件放置在 `index.vue` 同级目录且组件名以大写开头。当子组件过多，`index.vue` 同级目录建一个 `components` 文件夹，来放置子组件，若子组件再细化其他子组件，建议建一个子组件为名称大写的文件夹。

当同一个模块，几个路由组件依赖同一个或几个子组件时，建议在路由组件的同一级目录下建一个 `components` 文件夹。不同模块的路由组件依赖相同组件时，建议将组件提取到 `views` 文件夹下。

当路由组件与视图组件的 `methods` 涉及对数据处理或与视图无直接相关操作时，建议提取成方法到 `helper.js` 里面，`helper` 方法文件较多时，建议建一个 `helpers` 文件夹。若其他组件依赖相同 `helper` 时，与 `components` 同理。

一般性一个路由对应一个文件，该模块下的功能组件或者方法就建议在本文件夹下创建一个 `helper` 或  `components` 文件夹，各个功能模块维护自己的 `helper` 或  `components` 组件。

## 4. store、router、api

`store` 、 `router`、`api` 文件遵循 `pages` 目录下的业务分块。

`store` 里面设计到系统全局使用到状态，建议配置成全局 `getters`。

对于 `api` 目录下的各业务模块都涉及的方法，建议提取成封装成公用模块。

关于 `router` 路由的配置参考 [定制化-配置项-Router](configuration.md#Router) 的内容。

## 5. helpers、utils

`helpers` 与 `utils` 的区别在于是否是系统业务工具方法，`helpers` 可理解为业务相关的方法助手，`utils` 则是脱离业务的可复用的工具。

## 6. assets

assets 目录下的 `icons`、`images` 文件夹分别是 svg 目录与静态图片目录，目录下的静态资源可以根据业务模块的大小分类放置。

## 7. themes

`themes` 系统相关主题目录，主要是自定义第三方组件库主题样式及组件样式覆写，以及系统 chart 图表主题样式文件等。