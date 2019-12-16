# Development Advice

## Code Standards

- 组件相关
  - 语义化命名组件。
  - 只要有能够拼接文件的构建系统，每个组件单独分成文件。
  - 单文件组件的文件名要么单词大写开头 `(PascalCase)`，要么横线连接`(kebab-case)`并组件名完整单词而不缩写。
  - 组件名应该以高级别的单词开头，以描述性的修饰词结尾，以大驼峰命名，与组件文件名一致。
  - 和父组件紧密耦合的子组件应该以父组件名作为前缀命名，如组件需要嵌套使用，子组件命名在父组件后加 `item`。
  - 在单文件组件中没有内容的组件应该是自闭合的。
  - 在声明 `prop` 的时候，其命名应该始终使用 `camelCase`，而在模板中应该始终使用 `kebab-case`。
  - 多个 `Props` 的元素应该分多行撰写，每个 `Props` 一行，闭合标签单起一行。
  - 指令缩写，用 `:` 表示 `v-bind:` ，用 `@` 表示 `v-on:`。
  - 标签的 Props 应该有统一的顺序，依次为指令、属性和事件。
  - vue 单文件中的 `<template>、<script>、<style>` 标签的顺序，且标签之间留有空行。
  - 组件/实例的选项应该有统一的顺序，每个选项增加一个空行隔开，增加可读性。
  - Vue 组件中 `<template> Html` 过长，换行展示。
  - Vue 组件中不要直接操作异步请求，把所有的异步请求方法封装成一个独立 js 文件，或者放到 Vuex 中。
- 事件相关
  - 组件事件监听器，使用 `on-` 为前缀，比如 `on-change`。
  - 组件绑定点击事件，使用 `hand-` 为前缀，比如 `hand-btn`。
  - Vue 中监听的 `Dom` 事件记得垃圾回收。
- CSS 相关
  - 使用 [BEM](http://getbem.com/naming/) 命名规范来组织 CSS 代码，谨慎使用 `scoped` 。
  - ~~容器组件 `CSS` 命名 `容器名-wrapper`。~~
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
- 备注
  - 代码中不用的注释都删掉。
  - 调试结束，把不用的 console.log(...) 及时删掉，它会影响性能 。
- 其他
  - `Commit` 代码之前，[要先效验与格式化代码](/#Usage) `npm run lint`，没有问题再提交。如果使用的 git 版本工具，commit 前会自动 lint code， 没有错误才会 commit 成功。
  - [了解 BEM](http://getbem.com/)。
  - CSS命名BEM规范[BEM](http://getbem.com/naming/) - [CSS BEM 书写规范](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)
  - [使用 BEM 命名规范来组织 CSS 代码](https://zhuanlan.zhihu.com/p/46073785)。
  - [如何看待 CSS 中 BEM 的命名方式](https://www.zhihu.com/question/21935157)。
  - 更多 Standards 参考[ Vue 官方的特有代码的风格指南](https://cn.vuejs.org/v2/style-guide/)。
  - [Prettier your project](https://blog.souche.com/prettier-your-project/?from=timeline)

## Editor

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - VS Code ESLint extension.
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)：为 Vue 框架提供语法高亮、代码片段、Emmet、格式化、代码风格检查、智能提示、调试帮助等。文档：[vetur](https://vuejs.github.io/vetur/setup.html#extensions)。
- [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：使用 [Prettie](https://prettier.io/) 格式化插件，支持 JavaScript、TypeScript、Vue 等文件的格式化。
