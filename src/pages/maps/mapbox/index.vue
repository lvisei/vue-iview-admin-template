<template>
  <i-card class="mapbox" shadow :padding="5">
    <div class="mapbox__map-container" id="mapContainer" ref="mapContainer"></div>
  </i-card>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  name: 'Mapbox',

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
    this.initMapContainer()
  },

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    initMapContainer() {
      const container = this.$refs.mapContainer
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p1dHRybDR5MGJuZjQzcGhrZ2doeGgwNyJ9.a-vxW4UaxOoUMWUTGnEArw'
      const map = new mapboxgl.Map({
        container: 'mapContainer',
        style: 'mapbox://styles/mapbox/streets-v11'
      })
    }
  }
}
</script>

<style lang="less">
@import '~mapbox-gl/dist/mapbox-gl.css';
.mapbox {
  &__map-container {
    height: 600px;
  }
}
</style>
