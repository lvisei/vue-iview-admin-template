# 搭建 Vue 项目工程化

> 基于 [Vue CLI4](https://cli.vuejs.org/zh/guide/s) 搭建 Vue 2.0 项目

## PART 1: Vue CLI4 生成项目工程

1. 创建一个新项目：

```bash
vue create my-project
```

2. 选“手动选择特性”来选取需要的特性

```bash
Vue CLI v4.4.6
? Please pick a preset:
  default (babel, eslint)
❯ Manually select features
```

3. 根据项目业务需求，选择面向生产的特性，建议 `Babel`、`Linter / Formatter` 必须，其他未选择的后面也可以再安装插件使用

```bash
Vue CLI v4.4.6
? Please pick a preset: Manually select features
? Check the features needed for your project:
 ◉ Babel
 ◯ TypeScript
 ◉ Progressive Web App (PWA) Support
❯◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

4. 根据业务需求是否使用路由模式，后面也可以在修改

```bash
Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)
```

5. 选择 CSS 预处理语言

```bash
Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
  Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
❯ Less
  Stylus
```

6. 选择代码校验与格式化规则

```bash
Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
❯ ESLint + Prettier
```

7. 选择代码校验功能触发方式

```bash
Pick additional lint features:
 ◉ Lint on save
❯◉ Lint and fix on commit
```

8. 将各功能单独生成配置文件，方便后面扩展修改

```bash
Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
❯ In dedicated config files
  In package.json
```

## PART 2: 工程配置

### Eslint

#### ESLint 配置

在根目录配置 `.eslintrc.js` 文件

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [],
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};

```

其中：

- `parser: 'babel-eslint'`：使用 babel-eslint 解析语法。

- `plugins: []`：在 ESLint 中加载插件，插件可用于配置校验规则。

- `extends: [ ... ]`：在 ESLint 中使用[共享规则配置](https://cn.eslint.org/docs/developer-guide/shareable-configs)，其中 `eslint:recommended` 是 ESLint 内置的推荐校验规则配置（也被称作最佳规则实践）。`plugin:vue/essential` 是 Vue 官方推荐必须的校验 vue 语法规则配置，其依赖包为`eslint-plugin-vue`。`@vue/prettier`  是基于 Prettier 封装的代码格式规则，其依赖包为 `@vue/eslint-config-prettier`。

- `rules: {}`：覆写某个校验规则配置。

在 package.json 中添加校验命令

```javascript
"scripts": {
  "lint": "vue-cli-service lint",
}
```

`vue-cli-service lint` 是基于 ESLint  的命令行接口进行格式自动修复封装而来的。

#### ESLint 插件

如果不使用插件，很难发现代码可能存在的语法与格式错误，在开发环境书写代码的时除了终端与手动执行 `npm run lint` 以外没有任何的实时提示信息。为了可以实时看到错误信息，可以通过 VS Code 插件进行处理。安装 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 插件后可进行代码的实时提示。

为了防止不需要被校验的文件出现校验信息，可通过 `.eslintignore` 文件进行配置。

此时可以发现之前执行 `lint` 命令的错误通过插件的形式可实时在 VS Code 编辑器中进行显示。除此之外，一些 ESLint 的格式校验错误可通过配置 Save Auto Fix 进行保存自动格式化处理。具体 VS Code 的配置可参考 [ESLint 插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 的文档说明。

#### ESLint 确保代码上传

ESLint 中的质量规则校验与预防错误是无法通过自动进行格式化修复的，因此还需要一层保障能够确保代码提交之前所有的代码能够通过 ESLint 校验，这个功能将使用`Lint Staged`，具体配置查看 [Lint Staged](###Lint Staged)。

### Prettier

Prettier 是一个统一代码格式风格的工具，了解为什么使用可查看 [Why Prettier?](https://prettier.io/docs/en/why-prettier.html)，在 [Prettier vs Linters](https://prettier.io/docs/en/comparison.html) 中详细说明了 ESLint 与 Prettier 两者的区别，Linters 有两种类型的规则：

- 格式规则（Formatting rules）：例如 [max-len](https://eslint.org/docs/rules/max-len)、[keyword-spacing](https://eslint.org/docs/rules/keyword-spacing) 以及 [no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs) 等
- 质量规则（Code-quality rules）：例如 [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)、[no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals) 以及 [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors) 等

ESLint 的规则校验同时包含了**格式规则**和**质量规则**，但大部分情况下只有**格式规则**可以通过脚步命令与 VS Code 插件的 ESLint 的保存自动修复功能一键修复，而**质量规则**更多的是发现代码可能出现的 Bug 从而防止代码出错，这类规则一般需要手动修复。因此**格式规则** 并不是必须的，而**质量规则**则是必须的。Prettier 与 ESLint 的区别在于 Prettier 专注于统一的**格式规则**，从而减轻 ESLint 在**格式规则上**的校验，而对于**质量规则** 则交给专业的 ESLint 进行处理。

需要注意如果 ESLint 和 Prettier 配合使用时**格式规则**有重复且产生了冲突，那么在编辑器中使用保存自动修复功能时会发格式冲突。此时应该让两者把各自注重的规则功能区分开，使用 ESLint 校验**质量规则**，使用 Prettier 校验**格式规则**，更多信息可查看 [Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)。

#### Prettier 配置

在 ESLint 配置中已经集成脚手架封装 `@vue/prettier`规则包了，需要说明的是脚手架集成 prettier 中会安装配置 `eslint-config-prettier`，其 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 用于解决 ESLint 和 Prettier 配合使用时容易产生的**格式规则**冲突问题，其作用就是关闭 ESLint 中配置的一些格式规则，除此之外还包括关闭 `eslint-plugin-babel`、`eslint-plugin-vue`、`eslint-plugin-standard` 等格式规则。

Prettier的格式规则，可通过 `.prettierrc` 文件进行配置，未配置的情况下使用官方默认的格式规则。

```json
{
	"singleQuote": true,
	"semi": false,
	"printWidth": 120,
	"htmlWhitespaceSensitivity": "ignore"
}
```

对于不需要被格式的文件，可通过 `.prettierignore 文件进行配置。

#### Prettier 插件

类似 ESLint，可以配置 VS Code 的 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 插件通过保存就能自动格式化代码，具体的配置查看插件文档。

对于 vue 中的单文件组件的 `template` 也可以选择 Prettier 格式化，在 Prettier 插件的 html 部分选择 prettyhtml 进行格式化处理。

#### Prettier 确保代码上传

和 ESLint 一样，提交之前能够进行 Prettier 格式化，这个功能将使用`Lint Staged`，具体配置查看 [Lint Staged](###Lint Staged)。更多配置方案也可以查看 [Prettier - Pre-commit Hook](https://prettier.io/docs/en/precommit.html)。

### Babel

- `.babel.config.js`
- `@vue/cli-plugin-babel/preset`
  - `Babel 7` 
  - `babel-loader`
  - [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app)
    - [@babel/preset-env](https://new.babeljs.io/docs/en/next/babel-preset-env.html)

    - [@babel/plugin-transform-runtime](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime)
- `.browserslistrc`
- [@babel/preset-env](https://new.babeljs.io/docs/en/next/babel-preset-env.html)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
- 待续

### Webpack

- `.vue.config.js`
- devServer
- publicPath
- productionSourceMap
- loader
- plugins

- optimization.splitChunks

- 待续

### 测试

- 待续

#### Git Commit Message

[Commitizen](https://github.com/commitizen/cz-cli) 是一个规范 Git 提交说明（Commit Message）的 CLI 工具，具体如何配置可查看 [Cz 工具集使用介绍](https://juejin.im/post/5cc4694a6fb9a03238106eb9) 这篇文章。建议一起配合使用以下一些工具：

- [cz-customizable](https://github.com/leonardoanalista/cz-customizable)
- [commitlint](https://commitlint.js.org/#/)
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog)

配置后会产生以下一些特性：

- 使用 `git cz` 代替 `git commit` 进行符合 Angular 规范的 Commit Message 信息提交
- 代码提交之前会通过 [ghooks](https://github.com/ghooks-org/ghooks)  配合 git hook 进行提交信息校验，一旦提交信息不符合 Angular 规范，则提交会失败
- 执行 `npm run changelog` 会在根目录下自动生成 `CHANGELOG.md` 版本日志

### Lint Staged

在 [Git Commit Message](####Git Commit Message) 中使用了 [commitlint](https://commitlint.js.org/#/) 工具配合 husky 可以防止生成不规范的 Git Commit Message，从而阻止用户进行不规范的 Git 代码提交，其原理就是监听了 Git Hook 的执行脚本。

需要注意的是初始化 Git 之后默认会在 `.git/hooks` 目录下生成所有 Git 钩子的 Shell 示例脚本，这些脚本是可以被定制化的。对于开发而言去更改这些示例脚本适配项目不太友好，社区有一些类似的增强工具，它们对外抛出的是简单的钩子配置（例如 [ghooks](https://github.com/ghooks-org/ghooks) 在 `package.json` 中只需要进行简单的[钩子属性配置](https://github.com/ghooks-org/ghooks#setup)），而在内部则通过替换 Git 钩子示例脚本的形式使得外部配置的钩子可以被执行，例如 [husky](https://github.com/typicode/husky)、ghooks 以及 [pre-commit](https://github.com/pre-commit/pre-commit) 等。

可以使用 `pre-commit` 钩子配合 ESLint 与 Prettier 可以进行提交说明前的项目代码规则校验，当项目工程量较大时，ESLint 校验的时间可能出现比较长的问题，可以借助 `lint-staged` 工具来减少代码的检测量。

#### Lint Staged 配置

防止团队协作时开发者提交不符合 ESLint 规则的代码则可以通过 [lint-staged](https://github.com/okonet/lint-staged) 工具来实现。`lint-staged` 可以在用户提交代码之前使用 ESLint 检查 Git 暂存区中的代码信息，一旦存在不符合校验规则的代码，则终止提交行为。

需要注意的是 `lint-staged` 不会检查项目的全量代码，而只会检查添加到 Git 暂存区中的代码。

在 `package.json`中脚手架已经集成了`lint-staged`

```json
"gitHooks": {
  "pre-commit": "lint-staged"
},
"lint-staged": {
  "*.{js,jsx,vue}": [
    "vue-cli-service lint",
    "git add"
  ]
}
```

##PART 3:  编辑器

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - VS Code ESLint extension.
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)：为 Vue 框架提供语法高亮、代码片段、Emmet、格式化、代码风格检查、智能提示、调试帮助等。文档：[vetur](https://vuejs.github.io/vetur/setup.html#extensions)。
- [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：使用 [Prettie](https://prettier.io/) 格式化插件，支持 JavaScript、TypeScript、Vue 等文件的格式化。

###  参考链接

  - [Prettier your project](https://blog.souche.com/prettier-your-project/?from=timeline)
- [Web 项目编码规范化工具](https://github.com/liuvigongzuoshi/blog/issues/4)
- [从零开始配置 TypeScript 项目](https://juejin.im/post/6856410900577026061)

