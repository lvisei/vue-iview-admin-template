<template>
  <i-split
    class="code-editor-online"
    v-model="split"
    min="100px"
    max="100px"
    @on-moving="onSplitMoving"
  >
    <div slot="left" class="code-editor-online__split-pane code-editor-online__left">
      <MonacoEditor
        ref="editor"
        class="code-editor-online__editor"
        v-model="sourceCode"
        :options="monacoEditorOption"
        language="html"
        theme="vs-dark"
        @change="onEditorChange"
      />
    </div>
    <div slot="right" class="code-editor-online__split-pane code-editor-online__preview">
      <iframe
        class="code-editor-online__iframe"
        ref="iframe"
        frameborder="0"
        width="100%"
        height="100%"
        scrolling="no"
      ></iframe>
    </div>
  </i-split>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor'
import { debounce } from '@/utils'

export default {
  name: 'CodeEditorOnline',

  components: { MonacoEditor },

  props: {},

  data() {
    return {
      split: 0.5,
      monacoEditorOption: { automaticLayout: true },
      sourceCode:
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
    }
  },

  computed: {},

  watch: {},

  created() {
    this.debounce_updateIframe = debounce(this.updateIframe, 500)
  },

  mounted() {
    this.debounce_updateIframe(this.sourceCode)
  },

  updated() {},

  beforeDestroy() {},

  methods: {
    onEditorChange(value) {
      this.debounce_updateIframe(value)
    },

    onSplitMoving(event) {
      // const editor = this.$refs.editor.getEditor()
      // editor.layout()
    },

    updateIframe(vDom) {
      const iframe = this.$refs.iframe
      iframe.srcdoc = vDom

      // iframe.contentWindow.document.open()
      // iframe.contentWindow.document.write(vDom)
      // iframe.contentWindow.document.close()
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
}
</style>
