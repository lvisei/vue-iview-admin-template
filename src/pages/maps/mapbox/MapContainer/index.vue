<template>
  <div class="map-container" id="mapContainer" ref="mapContainer"></div>
</template>

<script>
import { initMapContainer } from './helpers'

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
    const map = initMapContainer('mapContainer')
    console.log('map: ', map)
  },

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style></style>
