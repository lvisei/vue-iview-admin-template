<template>
  <div class="page-500">
    <div class="page-500__image"></div>
    <div class="page-500__title">500</div>
    <div class="page-500__subtitle">抱歉，服务器出现异常!</div>
    <div class="page-500__extra"></div>
  </div>
</template>

<script>
export default {
  name: 'Page500',

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
.page-500 {
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
}
</style>
