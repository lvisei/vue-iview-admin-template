<template>
  <l-map
    ref="appMap"
    :crs="crs"
    :zoom="zoom"
    :minZoom="minZoom"
    :center="center"
    :maxBounds="maxBounds"
    :options="mapOptions"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
    @leaflet:load="onLoad"
  >
    <l-tile-layer :url="baseTileUrl" />
    <slot />
  </l-map>
</template>

<script>
import { latLng, latLngBounds, CRS } from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'MapContainer',

  components: {
    LMap,
    LTileLayer
  },

  filters: {},

  props: {
    center: {
      type: [Object, Array],
      default: () => [37.046875, 88.75390625]
    },
    maxBounds: {
      type: [Array, Object],
      default: () => latLngBounds(latLng(53.55, 73.66), latLng(3.86, 135.05))
    },
    zoom: {
      type: Number,
      default: 2
    },
    minZoom: {
      type: Number,
      default: 1
    },
    crs: {
      type: Object,
      custom: true,
      default: () => CRS.EPSG3857
    },
    mapOptions: {
      type: Object,
      default: () => ({
        zoomControl: true,
        attributionControl: false,
        zoomSnap: 0.1,
        preferCanvas: true,
        editable: true
      })
    },
    baseTileUrl: {
      type: String,
      default: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
  },

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

  methods: {
    zoomUpdated(zoom) {
      this.$emit('update:zoom', zoom)
    },
    centerUpdated(center) {
      this.$emit('update:center', center)
    },
    boundsUpdated(bounds) {
      this.$emit('update:bounds', bounds)
    },
    onLoad() {
      this.$emit('on-load', this.$refs.appMap.mapObject)
    }
  }
}
</script>
