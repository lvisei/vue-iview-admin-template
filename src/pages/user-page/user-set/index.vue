<template>
  <i-card class="user-set" shadow>
    <i-menu active-name="basic" @on-select="name => currentTab = name">
      <i-menu-item name="basic">基本设置</i-menu-item>
      <i-menu-item name="security">安全设置</i-menu-item>
    </i-menu>
    <UserSetBasic class="tab" v-if="currentTab === 'basic'"/>
    <UserSetSecurity class="tab" v-else/>
  </i-card>
</template>

<script>
import UserSetBasic from './UserSetBasic'
import UserSetSecurity from './UserSetSecurity'

export default {
  name: 'UserSet',

  components: {
    UserSetBasic,
    UserSetSecurity
  },

  filters: {},

  props: {},

  data() {
    return {
      currentTab: 'basic'
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {}
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
