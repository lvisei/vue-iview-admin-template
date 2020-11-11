<template>
  <i-split class="code-editor-online" v-model="split" @on-moving="onSplitMoving">
    <div slot="left" class="code-editor-online__split-pane code-editor-online__left">
      <MonacoEditor
        ref="editor"
        class="code-editor-online__editor"
        :value="value"
        :options="monacoEditorOption"
        language="html"
        theme="vs-dark"
        @change="onEditorChange"
      />
    </div>
    <div slot="right" class="code-editor-online__split-pane code-editor-online__right">
      <div ref="iframeContainer" class="code-editor-online__preview"></div>
    </div>
  </i-split>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor'
import { debounce } from '@/utils'

const defaultSourceCode =
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      h1,
      h2 {
        font-family: Lato;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script>
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = "<h1>Hello Word</h1>";
  </` +
  `script>
</html>`

export default {
  name: 'CodeEditorOnline',

  components: { MonacoEditor },

  props: {
    value: {
      type: String,
      default: defaultSourceCode
    }
  },

  model: {
    event: 'change'
  },

  data() {
    return {
      split: 0.5,
      monacoEditorOption: { automaticLayout: true }
    }
  },

  computed: {},

  watch: {},

  created() {
    this.debounce_updateIframe = debounce(this.updateIframe, 500)
  },

  mounted() {
    this.debounce_updateIframe(this.value)
  },

  updated() {},

  beforeDestroy() {},

  methods: {
    onEditorChange(value) {
      this.$emit('change', value)
      this.debounce_updateIframe(value)
    },

    onSplitMoving(event) {
      // const editor = this.$refs.editor.getEditor()
      // editor.layout()
    },

    updateIframe(vDom) {
      const iframeContainer = this.$refs.iframeContainer
      iframeContainer.innerHTML = ''
      const iframe = document.createElement('iframe')
      iframe.id = 'iframe'
      iframe.sandbox = 'allow-forms allow-popups allow-scripts allow-same-origin allow-modals'
      iframe.frameBorder = '0'
      iframe.scrolling = 'yes'
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframeContainer.append(iframe)

      iframe.contentWindow.document.open()
      iframe.contentWindow.document.write(vDom)
      iframe.contentWindow.document.close()
    }
  }
}
</script>

<style lang="less">
.code-editor-online {
  &__split-pane {
    position: relative;
    height: 100%;
  }

  &__editor {
    width: calc(100% - 5px);
    height: 100%;
  }

  &__preview {
    height: 100%;
  }
}
</style>
