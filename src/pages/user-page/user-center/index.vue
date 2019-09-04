<template>
  <i-row class="user-center">
    <i-col class="user-center__user-pane" :xs="24" :sm="24" :md="24" :lg="7">
      <UserPane />
    </i-col>
    <i-col class="user-center__project-pane" :xs="24" :sm="24" :md="24" :lg="17">
      <i-card shadow>project-pane</i-card>
    </i-col>
  </i-row>
</template>

<script>
import UserPane from './UserPane'

export default {
  name: 'UserCenter',

  components: { UserPane },

  filters: {},

  props: {},

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

  destroyed() {},

  methods: {}
}
</script>

<style lang="less">
.user-center {
  &__user-pane {
    padding-left: 12px;
    padding-right: 12px;
  }

  &__project-pane {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
