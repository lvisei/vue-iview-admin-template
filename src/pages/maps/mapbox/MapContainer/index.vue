<template>
  <div class="map-container" id="mapContainer" ref="mapContainer"></div>
</template>

<script>
import { loadMap } from './helpers'

export default {
  name: 'MapContainer',

  components: {},

  filters: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const container = this.$refs.mapContainer
    this.initMapContainer()
  },

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    initMapContainer() {
      const map = loadMap('mapContainer')
      map.on('load', () => {
        this.$emit('on-load', map)
      })
    }
  }
}
</script>

<style></style>
