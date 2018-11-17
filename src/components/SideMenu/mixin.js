export default {
  methods: {
    showChildren(item) {
      return item.children && item.children.length > 1
    },

    getRouteNameOrHref(item) {
      return item.href ? `isTurnByHref_${item.href}` : item.name
    }
  }
}
