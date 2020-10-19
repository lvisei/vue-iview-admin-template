<template>
  <i-card class="code-sandbox" shadow>
    <CodeEditorOnline class="code-sandbox__code-editor-online" />
  </i-card>
</template>

<script>
import CodeEditorOnline from '@/components/CodeEditorOnline'

export default {
  name: 'CodeSandbox',

  components: { CodeEditorOnline },

  props: {},

  data() {
    return {}
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
  height: 100%;

  .ivu-card-body {
    padding: 0;
    height: 100%;
  }
}
</style>
