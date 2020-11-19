<template>
  <div class="map-container" ref="mapContainer">
    <div class="map-container__slot">
      <slot v-if="!loading" />
    </div>
  </div>
</template>

<script>
import { loadMap } from './helper'

export default {
  name: 'MapContainer',

  provide() {
    return { map: null, arcGisApi: null }
  },

  components: {},

  props: {
    search: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      loading: true
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.initMapContainer()
  },

  updated() {},

  beforeDestroy() {
    if (this.view) {
      this.view.destroy()
      this.view = null
    }
  },

  destroyed() {},

  methods: {
    initMapContainer() {
      const mapOptions = { search: this.search }
      const element = this.$refs.mapContainer
      loadMap(element, mapOptions).then(({ view, map, _ArcgisApi }) => {
        this.view = view
        this.arcGisApi = _ArcgisApi
        this.view.when(
          () => {
            this.loading = false
            const instance = {
              view: this.view,
              arcGisApi: this.$arcgisApi
            }
            this.$emit('on-load', instance)
            this._provided = instance
          },
          error => {
            console.log('error: ', error)
          }
        )
      })
    }
  }
}
</script>
<style lang="less">
.map-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &__spin {
    z-index: 200;
  }

  .esri-component.esri-attribution.esri-widget {
    display: none !important;
  }
}
</style>
