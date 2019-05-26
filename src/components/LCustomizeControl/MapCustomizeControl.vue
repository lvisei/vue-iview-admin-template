<template>
  <l-control :position="position" ref="myControl">
    <slot></slot>
  </l-control>
</template>

<script>
import { DomEvent } from 'leaflet'
import { LControl } from 'vue2-leaflet'

export default {
  name: 'LCustomizeControl',

  components: {
    LControl
  },

  filters: {},

  props: {
    position: {
      type: String,
      default: 'topright'
    }
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.myControl.$el

      // makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
      el.setAttribute('aria-haspopup', true)

      DomEvent.disableClickPropagation(el)
      DomEvent.disableScrollPropagation(el)
    })
  },

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {}
}
</script>

<style></style>
