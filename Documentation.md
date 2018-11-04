# Documentation

## Categories
- [Documentation](#documentation)
  - [Categories](#categories)
  - [Introduction](#introduction)
    - [Kills](#kills)
    - [File structure](#file-structure)
  - [Layout](#layout)
  - [Router](#router)
  - [Code Standards](#code-standards)

## Introduction

### Kills

* CSS
  * less
  * flex

* JS
  * ES7 promise.finally  
  * ES7 async

* UI Library
  * iview

* JS Library
  * axios
  * echarts
  * js-cookie
  * countup

* Frame
  * Vue
  * Vue-Router @3.0+
  * Vuex 

* Project Automation 
  * webpack @4.0+
  * vue-loader @15.0+
  * babel @7.0+
  * eslint
  * prettier
  * postcss
    * autoprefixer 
  * vue-cli @3.0+


### File structure

```
.
├─dist               # 生产环境构建目录
├─public             # 主页模板
├─src
│    ├─api           # Api请求
│    ├─assets        # 静态资源
│    │  └─img        # 图片资源
│    ├─components    # 全局公用组件
│    ├─config       # 项目请求URL
│    ├─router       # 路由配置
│    ├─store        # Vuex配置
│    ├─styles       # 公共less文件
│    ├─utils        # 工具类
│    └─views        # 页面容器组件
│        ├─dashboard  # 监控分析页
│        ├─layout     # 布局组件
│        ├─log        # 日志管理
│        │  ├─db-log  # 用户登陆日志页
│        │  └─login-log  # 数据库操作日志页
│        ├─login         # 登陆页
│        ├─permission    # 权限管理
│        │  ├─role-manage  # 角色管理页
│        │  └─user-manage  # 用户管理页
│        └─personal  # 个人中心
│            ├─admin-center # 信息修改页
│            └─admin-log # 登陆记录页
├─.eslintignore       # 指定 eslint 忽略的文件
├─.eslintrc.js        # 配置 eslint 的检测规则
├─.gitignore          # Git 提交忽略的文件配置
├─.postcss.js         # 转换 css 的工具配置文件
├─.prettierignore     # 代码格式忽略文件配置
├─.prettierrc         # 代码格式文件配置
├─babel.config.js     # babel 编译配置
├─package-lock.json   # 用来锁定依赖的版本号（NPM 自动生成）
├─package.json        # 项目基本信息
├─README.md           # 项目介绍
├─vue.config.js       # 项目打包配置文件
```

## Layout

## Router

## Code Standards

* 组件相关
    * 只要有能够拼接文件的构建系统，每个组件单独分成文件
    * 单文件组件的文件名要么单词大写开头 (PascalCase)，要么横线连接(kebab-case)并组件名完整单词而不缩写
    * 组件名应该以高级别的单词开头，以描述性的修饰词结尾，以大驼峰命名
    * 和父组件紧密耦合的子组件应该以父组件名作为前缀命名
    * vue 单文件中的 `<template>、<script>、<style>` 标签的顺序
    * 组件/实例的选项应该有统一的顺序，每个选项增加一个空行隔开，增加可读性
    * Vue 组件中 `<template> Html` 过长，换行展示
    * Vue 中监听的事件记得垃圾回收
    * Vue 组件中不要直接操作异步请求，把所有的异步请求方法封装成一个独立 js 文件，或者放到 Vuex 中
* CSS相关
    * 使用 [BEM](https://en.bem.info/) 命名规范来组织CSS代码，谨慎使用 `scoped` 
    * 容器组件 `CSS` 命名 `容器名-wrapper`
* 备注 
    * 代码中不用的注释都删掉
    * 调试结束，把不用的 console.log(...) 及时删掉，它会影响性能 
* 其他
    * 所有命名语义化命名 
    * `Commit` 代码之前，[一定要先效验与格式化代码](#Lints-and-fixes-files)，没有问题再提交
    * [BEM的定义](https://www.w3cplus.com/css/bem-definitions.html)
    * [使用BEM命名规范来组织CSS代码](https://zhuanlan.zhihu.com/p/46073785)
    * 更多 Standards 参考[ Vue 官方的特有代码的风格指南](https://cn.vuejs.org/v2/style-guide/)
