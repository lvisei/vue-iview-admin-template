# 开发者建议

## 风格指南

### HTML/CSS/JS 风格指南

- 团队编码风格
  - [Front-End Coding Guidelines](https://guide.aotu.io/) - 编码规范由京东凹凸实验室整理。
  - [styleguide](https://github.com/fex-team/styleguide) - 百度 fex 团队。
- CSS BEM
  - CSS 命名 [BEM](http://getbem.com/naming/) 规范。
  - [CSS BEM 书写规范](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)。
  - [使用 BEM 命名规范来组织 CSS 代码](https://zhuanlan.zhihu.com/p/46073785)。
  - [如何看待 CSS 中 BEM 的命名方式](https://www.zhihu.com/question/21935157)。
- JavaScript
  - [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript?utm_source=gold_browser_extension) - [作者](https://github.com/ryanmcdermott)根据 Robert C. Martin [_《代码整洁之道》_](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)总结了适用于 JavaScript 的软件工程原则[《Clean Code JavaScript》](https://github.com/ryanmcdermott/clean-code-javascript)。
  - [Airbnb javascript](https://github.com/airbnb/javascript) - Airbnb javascript 风格指南。

### Vue 风格指南

> 本项目的风格指南主要是参照 `vue` 官方的[风格指南](https://cn.vuejs.org/v2/style-guide/index.html)。其中大部分规则也都配置在了[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)之中。更多 Standards 参考[ Vue 官方的特有代码的风格指南](https://cn.vuejs.org/v2/style-guide/)。

#### 文件相关

1. JS 文件

所有的`.js`文件都遵循横线连接 (kebab-case)。

例子：

- `@/src/utils/open-window.js`
- `@/src/views/svg-icons/require-icons.js`
- `@/src/components/MarkdownEditor/default-options.js`

2. Component

所有的`Component`文件都是以大写开头 (PascalCase)，这也是官方所 [推荐的](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)。

但除了 `index.vue`。

例子：

- `@/src/components/BackToTop/index.vue`
- `@/src/components/Charts/Line.vue`
- `@/src/views/example/components/Button.vue`

3. Pages

在`pages`文件下，代表路由的`.vue`文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。

例子：

- `@/src/pages/data-query/index.vue`
- `@/src/pages/data-query/require-data.js`

使用横线连接 (kebab-case)来命名`pages`主要是出于以下几个考虑。

- 横线连接 (kebab-case) 也是官方推荐的命名规范之一 [文档](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- `pages`下的`.vue`文件代表的是一个路由，所以它需要和`component`进行区分(component 都是大写开头)
- 页面的`url` 也都是横线连接的，比如`https://www.xxx.com/user-management`，所以路由对应的`pages`应该要保持统一
- 没有大小写敏感问题

#### 组件相关

1. 语义化命名组件。

2. 只要有能够拼接文件的构建系统，每个组件单独分成文件。

3. 单文件组件文件名称

单文件组件的文件名要么单词大写开头 `(PascalCase)`，要么横线连接`(kebab-case)`并组件名完整单词而不缩写。

```vue
// bad mycomponent.vue myComponent.vue // good my-component.vue MyComponent.vue
```

4. 组件名应该以高级别的单词开头，以描述性的修饰词结尾，以大驼峰命名，与组件文件名一致。

5. 紧密耦合的组件名

和父组件紧密耦合的子组件应该以父组件名作为前缀命名，如组件需要嵌套使用，子组件命名在父组件后加 `item`。

```vue
// bad components/ |- TodoList.vue |- TodoItem.vue └─ TodoButton.vue // good components/ |-
TodoList.vue |- TodoListItem.vue └─ TodoListItemButton.vue
```

6.  自闭合组件

在单文件组件中没有内容的组件应该是自闭合的。

```vue
<!-- bad -->
<my-component></my-component>

<!-- good -->
<my-component />
```

7. Prop 名大小写

在声明 `prop` 的时候，其命名应该始终使用 `camelCase`，而在模板中应该始终使用 `kebab-case`。

```vue
// bad export default { props: { 'greeting-text': String, }, }; // good export default { props: {
greetingText: String, }, };
<!-- bad -->
<welcome-message greetingText="hi" />

<!-- good -->
<welcome-message greeting-text="hi" />
```

8. 指令缩写

指令缩写，用 `:` 表示 `v-bind:` ，用 `@` 表示 `v-on:`。

```
<!-- bad -->
<input v-bind:value="value" v-on:input="onInput" />

<!-- good -->
<input :value="value" @input="onInput" />
```

10. Props 顺序

标签的 Props 应该有统一的顺序，依次为指令、属性和事件。

```vue
<my-component
  v-if="if"
  v-show="show"
  v-model="value"
  ref="ref"
  :key="key"
  :text="text"
  @input="onInput"
  @change="onChange"
/>
```

11. 单文件组件顶级标签的顺序

vue 单文件中的 `<template>、<script>、<style>` 标签的顺序，且标签之间留有空行。

```vue
<template>
  ...
</template>

<script>
/* ... */
</script>

<style>
/* ... */
</style>
```

12. 组件选项的顺序、组件选项中的空行

组件选项应该有统一的顺序

```vue
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {},

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
};
```

组件选项较多时，建议在属性之间添加空行。

```vue
export default {
  computed: {
    formattedValue() {
      // ...
    },

    styles() {
      // ...
    },
  },

  methods: {
    onInput() {
      // ...
    },

    onChange() {
      // ...
    },
  },
};
```

13. Vue 组件中 `<template> Html` 过长，换行展示。

14. Vue 组件中不要直接操作异步请求，把所有的异步请求方法封装成一个 API 文件目录。

15. 组件事件

组件事件监听器，使用 `on-` 为前缀，比如 `on-change`。

组件绑定点击事件，使用 `hand-` 为前缀，比如 `hand-btn`。

Vue 中监听的 `Dom` 事件记得垃圾回收。

16. 组件样式
  - 使用 [BEM](http://getbem.com/naming/) 命名规范来组织 CSS 代码，谨慎使用 `scoped` 。
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

## 编辑器

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - VS Code ESLint extension.
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)：为 Vue 框架提供语法高亮、代码片段、Emmet、格式化、代码风格检查、智能提示、调试帮助等。文档：[vetur](https://vuejs.github.io/vetur/setup.html#extensions)。
- [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：使用 [Prettie](https://prettier.io/) 格式化插件，支持 JavaScript、TypeScript、Vue 等文件的格式化。

## 提交代码

`Commit` 代码之前，[要先效验与格式化代码](/#Usage) `npm run lint`，没有问题再提交。如果使用的 git 版本工具，commit 前会自动 lint code， 没有错误才会 commit 成功。


## 其他
  - [Prettier your project](https://blog.souche.com/prettier-your-project/?from=timeline)
  - [Vue进阶为什么我的代码让别人看起来头皮发麻？](https://juejin.im/post/5bd83871f265da0afa3e3204)
  - [Vue.js 父子组件通信的十种方式](https://juejin.im/post/5bd18c72e51d455e3f6e4334)
  - [vue-9-perf-secrets](https://slides.com/akryum/vueconfus-2019)