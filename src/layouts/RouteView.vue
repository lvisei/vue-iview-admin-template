<script>
export default {
  name: 'RouteView',

  components: {},

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

  methods: {},

  render(createElement) {
    return this.$route.meta.keepAlive
      ? createElement('router-view')
      : createElement('router-view', {
          props: this.$route.meta.reRender ? { key: this.$route.fullPath } : {}
        })
  }
}
</script>

<style></style>
