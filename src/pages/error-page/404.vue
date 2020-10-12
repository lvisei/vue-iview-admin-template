<template>
  <div class="page-404">
    <div class="page-404__image"></div>
    <div class="page-404__title">404</div>
    <div class="page-404__subtitle">抱歉，您访问的页面不存在!</div>
    <div class="page-404__extra">
      <i-button type="primary" to="/">返回首页</i-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',

  components: {},

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
.page-404 {
  &__title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }

  &__subtitle {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }

  &__extra {
    margin-top: 32px;
    text-align: center;
  }
}
</style>
