# 配置项

你可以在 `/src/utils/config.js` 里做一些自定义配置：

## siteName

- 类型： `String`

  配置站点名称，应用到登录框，侧边栏顶部的标题文字显示。

## copyright

- 类型： `String`

  配置版权声明，应用到登录页、`Primay`布局底部。

## logoPath

- 类型： `String`

  配置站点 Logo，应用到登录框，侧边栏顶部的 Logo 显示。

## apiPrefix

- 类型： `String`

  配置项目中接口的前缀，接口相关文档可查看 [接口配置化]()

## fixedHeader

- 类型： `String`

  在`Primary`布局下，页面滚动时是否固定顶部。

## layouts

- 类型： `Array`

    配置哪些路由使用哪种布局，未指定路由使用默认布局 `Public`，项目中目前有 `Primary` 和 `Public` 两种布局，
    默认配置如下：
  
    ```js
        layouts: [
            {
                name: 'primary',
                include: [/.*/],
                exlude: [/(\/(en|zh))*\/login/],
            },
        ],
    ```

    每种布局的对象属性如下：

    - `name` - 布局的名称；
  
    - `include` - 指定使用该布局的路由规则列表，规则可为正则表达式或者字符串；
  
    - `exlude` - 指定不使用该布局的路由规则列表，规则可为正则表达式或者字符串。
  
 > 注意：`exlude` 优先级高于 `include`，后面的布局优先级高于前面的布局。开发过程中可能需要结合`src/layouts`目录下的布局使用，具体方法可查看 [使用布局]()。

## i18n

- 类型： `Object`

  配置国际化，默认配置如下：

  ```js
  i18n: {
      languages: [
        {
            key: 'en',
            title: 'English',
            flag: '/america.svg',
        },
        {
            key: 'zh',
            title: '中文',
            flag: '/china.svg',
        },
      ],
      defaultLanguage: 'en',
  }
  ```

  ### i18n.languages

  - 类型： `Array`

    指定应用支持哪些语言，每种语言的对象属性如下：

    - `key` - 语言的`key`，应用到页面 url 上以区分语言，也对应 `src/locales` 目录下的语言包文件夹名；

    - `title` - 语言名称，在登录页底部、`Primay` 布局顶部语言切换显示；

    - `flag` - 语言的国旗图标的路径，在 `Primay` 布局顶部语言切换显示。

 ### i18n.defaultLanguage
   
   - 类型： `String`

        配置默认语言。

## Layout

## Router

## Code Standards

* 组件相关
    * 语义化命名组件
    * 只要有能够拼接文件的构建系统，每个组件单独分成文件。
    * 单文件组件的文件名要么单词大写开头 `(PascalCase)`，要么横线连接`(kebab-case)`并组件名完整单词而不缩写。
    * 组件名应该以高级别的单词开头，以描述性的修饰词结尾，以大驼峰命名，与组件文件名一致。
    * 和父组件紧密耦合的子组件应该以父组件名作为前缀命名，如组件需要嵌套使用，子组件命名在父组件后加 `item`。
    * 在单文件组件中没有内容的组件应该是自闭合的。
    * 在声明 `prop` 的时候，其命名应该始终使用 `camelCase`，而在模板中应该始终使用 `kebab-case`。
    * 多个 `Props` 的元素应该分多行撰写，每个 `Props` 一行，闭合标签单起一行。
    * 指令缩写，用 `:` 表示 `v-bind:` ，用 `@` 表示 `v-on:`
    * 标签的 Props 应该有统一的顺序，依次为指令、属性和事件。
    * vue 单文件中的 `<template>、<script>、<style>` 标签的顺序，且标签之间留有空行。
    * 组件/实例的选项应该有统一的顺序，每个选项增加一个空行隔开，增加可读性。
    * Vue 组件中 `<template> Html` 过长，换行展示。
    * Vue 组件中不要直接操作异步请求，把所有的异步请求方法封装成一个独立 js 文件，或者放到 Vuex 中。
* 事件相关
    *  使用 `on-` 为前缀，比如 `on-change`。
    *  Vue 中监听的 `Dom` 事件记得垃圾回收。
* CSS相关
    * 使用 [BEM](https://github.com/inuitcss/inuitcss) 命名规范来组织CSS代码，谨慎使用 `scoped` 。
    * ~~容器组件 `CSS` 命名 `容器名-wrapper`。~~
        ```
        // ============================================================
        // There are several different BEM  naming conventions that
        // I'm aware of. To make things easier, I refer to the
        // methodologies by the name of projects that utilize them.
        //
        // suit: http://suitcss.github.io/
        // -------------------------------------
        // BlockName
        // BlockName--modifierName
        // BlockName-elementName
        // BlockName-elementName--modifierName
        //
        // inuit: http://inuitcss.com/
        // ---------------------------
        // block-name
        // block-name--modifier-name
        // block-name__element-name
        // block-name__element-name--modifier-name
        //
        // yandex: http://bem.info/
        // ------------------------
        // block-name
        // block-name_modifier_name
        // block-name__element-name
        // block-name__element-name_modifier_name
        // ============================================================
        ```
* 备注
    * 代码中不用的注释都删掉。
    * 调试结束，把不用的 console.log(...) 及时删掉，它会影响性能 。
* 其他
    * `Commit` 代码之前，[一定要先效验与格式化代码](#Lints-and-fixes-files)，没有问题再提交。
    * [了解 BEM](http://getbem.com/)。
    * [使用BEM命名规范来组织CSS代码](https://zhuanlan.zhihu.com/p/46073785)。
    * [如何看待 CSS 中 BEM 的命名方式](https://www.zhihu.com/question/21935157)。
    * 更多 Standards 参考[ Vue 官方的特有代码的风格指南](https://cn.vuejs.org/v2/style-guide/)。

## Editor
* [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：使用[Prettie](https://prettier.io/)格式化插件，支持JavaScript、TypeScript、Vue等文件的格式化。
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)：为Vue框架提供语法高亮、代码片段、Emmet、格式化、代码风格检查、智能提示、调试帮助等。文档: [vetur](https://vuejs.github.io/vetur/setup.html#extensions)。