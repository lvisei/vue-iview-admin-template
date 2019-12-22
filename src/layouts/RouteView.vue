<script>
export default {
  name: 'RouteView',
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
