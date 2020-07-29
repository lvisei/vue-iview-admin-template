<template>
  <i-card class="user-set" shadow>
    <i-menu active-name="UserSetBasic" @on-select="onMenuSelect">
      <i-menu-item name="UserSetBasic">基本设置</i-menu-item>
      <i-menu-item name="UserSetSecurity">安全设置</i-menu-item>
    </i-menu>
    <component class="tab" v-bind:is="currentComponent" />
  </i-card>
</template>

<script>
export default {
  name: 'UserSet',

  components: {},

  filters: {},

  props: {},

  data() {
    return {
      currentComponent: ''
    }
  },

  computed: {},

  watch: {},

  created() {
    const currentComponent = 'UserSetBasic'
    this.onMenuSelect(currentComponent)
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    onMenuSelect(component) {
      import(`./${component}`).then(module => {
        this.currentComponent = module.default
      })
    }
  }
}
</script>

<style lang="less">
.user-set {
  .ivu-card-body {
    display: flex;
    padding-left: 0px;

    .tab {
      flex: 1;
      padding: 8px 40px;
    }
  }
}
</style>
