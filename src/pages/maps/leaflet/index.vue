<template>
  <i-card class="leaflet" shadow :padding="5">
    <MapContainer
      @on-load="onLoad"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-control-scale position="bottomleft" :imperial="false"></l-control-scale>
      <LControlPosition position="bottomright" :center="currentCenter"></LControlPosition>
      <LCustomizeControl position="topright">
        <slot name="topright-control"></slot>
      </LCustomizeControl>
      <LCustomizeControl position="bottomleft" style="margin-left: 5px;">
        <slot name="bottomleft-control"></slot>
      </LCustomizeControl>
      <LCustomizeControl position="bottomright">
        <slot name="bottomright-control"></slot>
      </LCustomizeControl>
    </MapContainer>
  </i-card>
</template>

<script>
import MapContainer from './MapContainer'
import { LControlScale } from 'vue2-leaflet'
import LControlPosition from '@/components/Vue2Leaflet/LControlPosition'
import LCustomizeControl from '@/components/Vue2Leaflet/LCustomizeControl'

export default {
  name: 'Leaflet',

  components: { MapContainer, LControlScale, LControlPosition, LCustomizeControl },

  filters: {},

  props: {},

  data() {
    return {
      currentZomm: 0,
      currentCenter: { lat: 0, lng: 0 },
      currentBounds: null
    }
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
    onLoad(mapObject) {
      // Vue.prototype.$mapObject = mapObject
      // console.log('mapObject: ', mapObject)
    },

    zoomUpdated(zoom) {
      this.currentZomm = zoom
    },

    centerUpdated(center) {
      this.currentCenter = center
    },

    boundsUpdated(bounds) {
      this.currentBounds = bounds
    }
  }
}
</script>

<style lang="less">
.leaflet {
  .vue2leaflet-map {
    height: 800px;
  }
}
</style>
