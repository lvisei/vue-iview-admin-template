<template>
  <div class="el-form-generator">
    <iframe
      class="el-form-generator__iframe"
      src="https://mrhj.gitee.io/form-generator"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'ElFormGenerator',

  components: {},

  filters: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style lang="less" scoped>
.el-form-generator {
  flex: 1;
  // fixed Safari height bug
  display: flex;

  &__iframe {
    width: 100%;
    flex: 1;
  }
}
</style>
