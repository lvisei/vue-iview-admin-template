<template>
  <i-card class="arcgis" shadow :padding="5">
    <MapContainer class="arcgis__map-container" @on-load="onMapLoad">
      <MapPosition class="arcgis__map-position" />
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
    height: 800px;
  }

  &__map-position {
    left: 0;
    bottom: 0;
  }
}
</style>
