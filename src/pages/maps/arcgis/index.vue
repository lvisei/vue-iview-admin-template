<template>
  <i-card class="arcgis" shadow :padding="5">
    <MapContainer class="sketch-graphic" @on-load="onMapLoad">
      <MapPosition class="sketch-graphic__map-position" />
      <slot />
    </MapContainer>
  </i-card>
</template>

<script>
import MapContainer from './ArcGISMap/MapContainer'
import MapPosition from './ArcGISMap/MapPosition'

export default {
  name: 'ArcGis',

  components: { MapContainer, MapPosition },

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

  beforeDestroy() {},

  methods: {
    onMapLoad({ view, arcGisApi }) {
      this.view = view
      this.arcGisApi = arcGisApi
    }
  }
}
</script>

<style lang="less">
.arcgis {
  .map-container {
    height: 600px;
  }
}
</style>
