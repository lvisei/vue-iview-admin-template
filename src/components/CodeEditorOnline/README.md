# Code Editor Online

[Monaco Editor](https://github.com/Microsoft/monaco-editor) is the code editor that powers VS Code, now it's available as a Vue component `<MonacoEditor>` thanks to this project.

## Usage

### Use with webpack

Use [monaco-editor-webpack-plugin](https://github.com/Microsoft/monaco-editor-webpack-plugin):

```js
// webpack.config.js
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  plugins: [
    new MonacoEditorPlugin({
      // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      // Include a subset of languages support
      // Some language extensions like typescript are so huge that may impact build performance
      // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
      // Languages are loaded on demand at runtime
      languages: ['javascript', 'css', 'html', 'typescript']
    })
  ]
}
```

Then use the component:

```vue
<template>
  <MonacoEditor class="editor" v-model="code" language="javascript" />
</template>

<script>
import MonacoEditor from 'MonacoEditor'

export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      code: 'const noop = () => {}'
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
```

### Props

- `options`: The [second argument](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html) of [`monaco.editor.create`](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#create).
- `value`: A shortcut to set `options.value`.
- `theme`: A shortcut to set `options.theme`.
- `language`: A shortcut to set `options.language`.
- `amdRequire`: Load monaco-editor using given amd-style require function.
- `diffEditor`: `boolean` Indicate that this is a DiffEditor, `false` by default.

### Component Events

#### `editorWillMount`

- Params:
  - `monaco`: [`monaco module`](https://microsoft.github.io/monaco-editor/api/index.html)

Called before mounting the editor.

#### `editorDidMount`

- Params:
  - `editor`: [`IStandaloneCodeEditor`](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html) for normal editor, [`IStandaloneDiffEditor`](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonediffeditor.html) for diff editor.

Called when the editor is mounted.

#### `change`

Editor value is updated.

- Params:
  - `value`: New editor value.
  - `event`: The `event` from [`onDidChangeModelContent`](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html#ondidchangemodelcontent).

#### Editor Events

You can listen to the editor events directly like this:

```vue
<template>
  <MonacoEditor v-model="code" @editorDidMount="editorDidMount" />
</template>

<script>
export default {
  methods: {
    editorDidMount(editor) {
      // Listen to `scroll` event
      editor.onDidScrollChange(e => {
        console.log(e)
      })
    }
  },

  data() {
    return {
      code: '...'
    }
  }
}
</script>
```

Refer to [this page](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html) for all editor events.

### Methods

Use `ref` to interact with the `MonacoEditor` component in order to access methods: `<MonacoEditor ref="editor" />`, then `this.$refs.editor.getEditor()` will be available.

### Use the DiffEditor

Use `diffEditor` prop to indicate that this is a DiffEditor, use `original` prop to set the content for the original editor, use `value` prop to set the content for the modified editor.

```vue
<MonacoEditor
  language="javascript"
  :diffEditor="true"
  :value="code"
  :original="originalCode"
/>
```

In this case, the component's `getEditor()` returns the [`IStandaloneDiffEditor`](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonediffeditor.html) instance, while you can use `getModifiedEditor()` to get the modified editor which is an [`IStandaloneCodeEditor`](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html) instance.
