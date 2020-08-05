# 风格指南

## HTML/CSS/JS 风格指南

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


## Vue 风格指南

> 本项目的风格指南主要是参照 `vue` 官方的[风格指南](https://cn.vuejs.org/v2/style-guide/index.html)。其中大部分规则也都配置在了[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)之中。更多 Standards 参考[ Vue 官方的特有代码的风格指南](https://cn.vuejs.org/v2/style-guide/)。

### 基础内容

#### 1. 组件化命名规则

- 语义化命名组件。

按照功能命名：比如头部就是 Header，就是头部导航栏，按照页面来分组件：比如文章列表 NewsItem，即可用于文章列表，也可以用在详情页的内容推荐。

- 单文件组件文件名称

单文件组件的文件名以高级别的单词开头，以描述性的修饰词结尾并组件名完整单词而不缩写，以大驼峰命名，与组件文件名一致。。

单文件组件使用要么单词大写开头 `(PascalCase)`，要么横线连接`(kebab-case)`

  ```bash
  // bad 
  mycomponent.vue myComponent.vue 
  // good 
  my-component.vue MyComponent.vue
  ```

-  紧密耦合的组件名

和父组件紧密耦合的子组件应该以父组件名作为前缀命名，如组件需要嵌套使用，子组件命名在父组件后加 `item`。

  ```bash
  // bad
  components/
  |- TodoList.vue
  |- TodoItem.vue
  └─ TodoButton.vue
  
  // good
  components/
  |- TodoList.vue
  |- TodoListItem.vue
  └─ TodoListItemButton.vue
  ```

#### 2.  自闭合组件

在单文件组件中没有内容的组件应该是自闭合的。

```vue
<!-- bad -->
<my-component></my-component>

<!-- good -->
<my-component />
```

#### 3. Prop 名大小写

在声明 `prop` 的时候，其命名应该始终使用 `camelCase`，而在模板中应该始终使用 `kebab-case`。

```
// bad
export default {
  props: {
    'greeting-text': String,
  },
};

// good
export default {
  props: {
    greetingText: String,
  },
};
<!-- bad -->
<welcome-message greetingText="hi" />

<!-- good -->
<welcome-message greeting-text="hi" />
```

#### 4. 指令缩写

指令缩写，用 `:` 表示 `v-bind:` ，用 `@` 表示 `v-on:`。

```
<!-- bad -->
<input v-bind:value="value" v-on:input="onInput" />

<!-- good -->
<input :value="value" @input="onInput" />
```

#### 5. Props 顺序

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

#### 6. 单文件组件顶级标签的顺序

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

#### 7. 组件选项的顺序、组件选项中的空行

组件选项应该有统一的顺序，每个组件 `export default {}` 内的方法顺序一致，方便查找对应的方法。

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

####8. `props` 数据类型

`props` 里加数据类型，是否必传，以及默认值，便于排查错误，让传值更严谨，至少要数据类型。

```javascript
props: {
  type: {
    type: String,
    required: true,
    validator: value => ['edit', 'add'].indexOf(value) !== -1
  }
}
```

### 组件 CSS 命名

随着项目模块增多，防止因为不同页面或者组件中定义的 CSS 冲突，推荐使用: BEM命名规范，分别代表着:Block(块)、Element(元素)、Modifier(修饰符)

使用 [BEM](http://getbem.com/naming/) 命名规范来组织 CSS 代码，谨慎使用 `scoped` 。

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

### 业务相关

####  1. 分离组件中的非直接视图层操作的方法

单文件组件中不要直接操作异步请求，把所有的异步请求方法封装成到 API 文件目录。

当单文件组件内的`methods`过多时，建议将非劫持数据方法单独提取成`helper`文件。

####  2. 组件事件

   组件事件监听器，使用 `on-` 为前缀，比如 `on-change`。

   组件绑定点击事件，使用 `hand-` 为前缀，比如 `hand-btn`。

#### 3. 释放组件资源

使用定时器，要在组件摧毁之前 `beforeDestroy()` 生命周期内清除定时器。

 Vue 中监听的 `Dom` 事件也需要垃圾回收，同理单文件组件内有实例也需摧毁。

#### 4. 使用固定一种模块化解决方案

一般在业务场景下，最常使用的是 `ES Module` 与 `CommonJS`，建议项目开发统一使用固定一种模块化解决方案 `ES Module`。

### 组件封装

- 组件文件就近化原则
- 组件设计单一原则