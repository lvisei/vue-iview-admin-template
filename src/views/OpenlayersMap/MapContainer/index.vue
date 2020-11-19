<template>
  <div ref="mapContainer" class="map-container" id="mapContainer">
    <template v-if="!loading">
      <GeoJsonLayer :feature-list="featureList" />
      <div class="map-container__status-bar">Zoom: {{ zoom }}, Center: {{ center.join(',') }}</div>
      <slot />
    </template>
  </div>
</template>

<script>
import GeoJsonLayer from './GeoJsonLayer'
import { initMap } from './helpers/init-map'

export default {
  name: 'MapContainer',

  provide() {
    return { mapInstance: null }
  },

  components: { GeoJsonLayer },

  filters: {},

  props: {
    // GeoJSONFeature[Object.freeze()]
    featureList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      loading: true,
      zoom: 3,
      center: [106.46281299898496, 29.631357102439466]
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { zoom, center } = this
    const { mapContainer } = this.$refs
    const map = initMap(mapContainer, zoom, center)
    this._provided.mapInstance = map
    this.bindEvent(map)
    this.loading = false
    this.$once('hook:beforeDestroy', () => {
      map.setTarget(null)
      this._provided.mapInstance = null
    })
  },

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    bindEvent(map) {
      map.on('pointermove', event => {
        const { coordinate } = event
        this.center = coordinate
      })
      map.on('moveend', event => {
        const zoom = map.getView().getZoom()
        this.zoom = Math.round(zoom)
      })
    }
  }
}
</script>

<style lang="less">
.map-container {
  position: relative;
  width: 100%;
  height: 100%;

  &__status-bar {
    background: rgba(255, 255, 255, 0.8);
    padding: 0 5px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
  }

  .ol-zoom {
    top: 0.5em;
    left: unset;
    right: 0.5em;
  }
}
</style>
