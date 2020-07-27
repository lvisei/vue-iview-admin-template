# Quick Start

> 在开始之前，推荐先学习 [Vue](https://cn.vuejs.org/) 、 [ES2015+](http://es6.ruanyifeng.com/) 、 [View UI](https://www.iviewui.com/docs/introduce) 、 [Vue CLI 3](https://cli.vuejs.org/zh/)，并正确安装和配置了 [Node.js](https://nodejs.org/) v10 或以上 、[Git](https://git-scm.com/)。提前了解和学习这些知识会非常有帮助。

## Installation

```bash
git clone https://github.com/liuvigongzuoshi/vue-iview-admin-template my-project
cd my-project
```

## Scaffolding

应用的目录结构如下

```bash
├─dist/                    # 生产环境构建目录
├─public/                  # 主页模板目录
├─src/                     # 源码目录
│    ├─api/                # 数据接口目录
│    ├─assets/             # 静态资源文件目录
│    ├─components/         # 业务无关公用组件目录
│    ├─config/             # 项目配置目录
│    ├─helpers/            # 全局业务相关工具方法目录
│    ├─layouts/            # 布局目录
│    ├─lib/                # 静态数据目录
│    ├─router/             # 路由配置目录
│    ├─store/              # Vuex 配置目录
│    ├─themes/             # 相关主题样式目录
│    ├─utils/              # 业务无关工具方法目录
│    ├─mock/               # mock 目录
│    ├─permission/         # 路由权限目录
│    ├─views/              # 项目业务相关公用组件目录
│    └─pages/              # 页面容器组件目录
│        ├─dashboard/           # 监控分析页
│        │  ├─components/       # 监控分析页子组件
│        │  └─index.vue         # 监控分析页路由容器组件
│        ├─system-management/   # 系统管理页模块
│        │  ├─helpers/          # 系统管理模块工具方法
│        │  ├─menu-management/  # 菜单管理页
│        │  │ ├─MenuEdit.vue    # 菜单编辑组件
│        │  │ ├─helper.js       # 菜单管理工具方法
│        │  │ └─index.vue       # 监控分析页路由容器组件
│        │  ├─role-management/  # 角色管理页
│        │  └─user-management/  # 用户管理页
│        ├─list-page/           # 列表页模块
│        ├─login/               # 登陆页
│        └─user-page/           # 个人中心页模块
│            ├─user-center/     # 个人中心
│            └─user-set/        # 设置中心
├─.eslintignore            # 指定 eslint 忽略的文件
├─.eslintrc.js             # 配置 eslint 的检测规则
├─.gitignore               # Git 提交忽略的文件配置
├─.browserslistrc          # 项目的目标浏览器的范围配置
├─.prettierignore          # Prettier忽略文件配置
├─.prettierrc              # Prettier配置
├─babel.config.js          # babel 编译配置
├─package-lock.json        # 用来锁定依赖的版本号（NPM 自动生成）
├─package.json             # package.json
├─README.md                # 项目介绍
├─vue.config.js            # 项目脚手架工具配置文件
```

## Stacks

- CSS

  - less
  - flex
  - ......

- JS

  - ES7 promise.finally
  - ES7 async
  - ......

- UI Library

  - View UI

- JS Library

  - axios
  - echarts
  - vue-echarts
  - lodash
  - js-cookie
  - countup
  - canvas-nest.js
  - jsencrypt
  - crypto-js
  - v-clipboard
  - codemirror
  - bpmn-js

- Frame

  - Vue
  - Vue-Router
  - Vuex
  - PWA

- Map

  - leaflet
  - vue2-leaflet
  - esri-loader
  - ol
  - mapbox-gl
  - proj4
  - turf

- Project Automation
  - webpack @4+
  - vue-loader
  - babel @7.0+
  - eslint
  - prettier
  - postcss
    - autoprefixer
  - vue-cli @3+
  - mockjs
  - lint-staged

## Development

1. 进入目录安装依赖，国内用户推荐使用淘宝镜像进行加速

```bash
yarn install
```

或者

```bash
npm install
```

2. 启动本地服务器

```bash
npm run start
```

3. 启动完成后打开浏览器访问 [http://localhost:9000](http://localhost:9000)，如果需要更改启动端口，可在 `vue.config.js` 文件中配置。
