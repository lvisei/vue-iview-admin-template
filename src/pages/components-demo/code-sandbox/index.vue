<template>
  <i-card class="code-sandbox" shadow>
    <CodeEditorOnline class="code-sandbox__code-editor-online" :value="sourceCode" />
  </i-card>
</template>

<script>
import CodeEditorOnline from '@/components/CodeEditorOnline'

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
      <script src="https://cdn.bootcdn.net/ajax/libs/Turf.js/6.2.0-alpha.2/turf.min.js">` +
  `</` +
  `script>` +
  `<script>
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = "<h1>Hello Word</h1>";
    const from = turf.point([-75.343, 39.984]);
    const to = turf.point([-75.534, 39.123]);
    const options = {units: 'miles'};
    const distance = turf.rhumbDistance(from, to, options);
    appDiv.innerHTML = appDiv.innerHTML + distance + ' miles';
  </` +
  `script></html>`

export default {
  name: 'CodeSandbox',

  components: { CodeEditorOnline },

  props: {},

  data() {
    return {
      sourceCode: defaultSourceCode
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style lang="less">
.code-sandbox {
  flex: 1;
  // fixed Safari height bug
  display: flex;

  .ivu-card-body {
    width: 100%;
    flex: 1;
    padding: 0;
  }
}
</style>
