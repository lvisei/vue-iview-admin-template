# 配置项

## Config

_`/src/config.js`_

### siteName

- 类型： `String`

  配置站点名称，应用到登录页。

### shortSiteName

- 类型： `String`

  配置站点简称，应用到侧边栏顶部的标题文字显示。

### copyright

- 类型： `String`

  配置版权声明，应用到登录页、`Layouts`布局底部。

## BASE_URL

_`.env.development` 、 `.env.production`_

- 开发环境 `VUE_APP_BASE_API="https://easy-mock/development.com"`。

- 正式环境 `VUE_APP_BASE_API="https://easy-mock/production.com"`。

## Layouts

_`src/layouts` 配置页面布局_

- 待续

## Router

- `path: 'route-path',` - 路由路径。
  - 建议取 `RouteComponent` 组件名的 kebab-case 格式做为路由路径。。
  - 例如：`user-center`。

- `name: 'RouteName'` - 路由名称。
  -  必须设置且不能重复。
  -  建议取 `RouteComponent` 组件名的 `kebab-case` 或 `PascalCase` 格式做为路由名称，并全局采用其中一种。
  -  例如：`user-center` 或  `UserCenter` 。

- `component: 'RouteComponent'` - 页面组件。
  -  非特殊业务下，建议动态引入，开发环境并设置`webpackChunkNam`，方便调试。
  -  例如：`import(/* webpackChunkName: "user-center" */ '@/pages/user-center')`。

- `hidden: true` - 如果设置为 `hidden:true` 则不会显示到导航栏，默认为 `false`。

- `meta`
  - `title: 'title'` - 当前页面名字，会对应显示到导航栏，必须设置，方便阅读代码快速定位。
  - `icon: 'icon-name'` - 当前页面的图标，建议设置。
  - `href: 'url'` - 如果设置了 `href` 属性，则会跳转到这个连接。
  - `auths: ['super_admin','admin']` - 设置页面可访问的角色类型, 不设置都可以访问，可选。
