# 配置项

## Config

_`/src/utils/config.js`_

### siteName

- 类型： `String`

  配置站点名称，应用到登录框。

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

- `path: 'router-name',` - 路由路径。

- `name: 'RouterName'` - 路由名字，必须设置且不能重复。

- `component: RouterName` - 组件名。

- `hidden: true` - 如果设置为 `hidden:true` 则不会显示到导航栏，默认为 `false`。

- `meta`
  - `auths: ['super_admin','admin']` - 设置页面可访问的角色类型, 不设置都可以访问。
  - `title: 'title'` - 当前页面名字，会对应显示到导航栏，必须设置。
  - `icon: 'icon-name'` - 当前页面的图标，建议设置。
  - `href: 'url'` - 如果设置了 `href` 属性，则会跳转到这个连接。
