# 开发

##  新增页面

### 1. 新增路由
首先在 `@/router/route.js` 中增加你需要添加的路由。

### 2. 新增 page

新增完路由之后要在 `@/pages` 文件下 创建对应的文件夹，一般性一个路由对应一个文件，该模块下的功能组件或者方法就建议在本文件夹下创建一个`helpers`或`components`文件夹，各个功能模块维护自己的`helpers`或`components`组件。

### 3. 新增 api

最后在 `@/api` 文件夹下创建本模块对应的 api 服务。

## 提交代码

`Commit` 代码之前，[要先效验与格式化代码](/#Usage) `npm run lint`，没有问题再提交。如果使用的 git 版本工具，commit 前会自动 lint code， 没有错误才会 commit 成功。

