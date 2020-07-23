<template>
  <GlobalLayout>
    <BreadCrumb class="bread" :bread-crumb-list="breadCrumbList" />
    <router-view />
  </GlobalLayout>
</template>

<script>
import GlobalLayout from './GlobalLayout'
import BreadCrumb from '@/components/BreadCrumb'
import { getBreadCrumbList } from '@/helpers/router'

export default {
  name: 'MainView',

  components: {
    GlobalLayout,
    BreadCrumb
  },

  filters: {},

  props: {},

  data() {
    return {
      breadCrumbList: []
    }
  },

  computed: {},

  watch: {
    $route: {
      handler: 'watchRoute',
      immediate: true
    }
  },

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    watchRoute(newRoute) {
      // const {
      //   name,
      //   meta: { title }
      // } = newRoute
      this.breadCrumbList = getBreadCrumbList(newRoute.matched)
    }
  }
}
</script>

<style>
.bread {
  margin-bottom: 25px;
}
</style>
