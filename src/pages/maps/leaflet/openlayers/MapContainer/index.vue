<template>
  <vl-map
    class="map-container"
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    data-projection="EPSG:4326"
  >
    <vl-view
      :zoom.sync="zoom"
      :center.sync="center"
      :max-zoom="maxZomm"
      :min-zoom="minZoom"
      projection="EPSG:4326"
    />

    <vl-layer-tile v-for="item in tileLayer" :key="item.url">
      <vl-source-wmts
        :id="`wmts${item.url}`"
        :url="item.url"
        :format="item.format"
        :layer-name="item.layerName"
        :matrix-set="item.matrixSet"
        :style-name="item.style"
      />
    </vl-layer-tile>

    <vl-layer-vector>
      <vl-source-vector :features="featureList" />
      <!-- <vl-feature></vl-feature> -->
    </vl-layer-vector>

    <div class="map-container__status-bar">Zoom: {{ zoom }}, Center: {{ center.join(',') }}</div>
  </vl-map>
</template>

<script>
import Vue from 'vue'
import { Map, TileLayer, WmtsSource, VectorLayer, VectorSource, Feature } from 'vuelayers'
import 'vuelayers/lib/style.css'

// Hacks
Vue.use(Map)
Vue.use(TileLayer)
Vue.use(WmtsSource)
Vue.use(VectorLayer)
Vue.use(VectorSource)
Vue.use(Feature)

export default {
  name: 'MapContainer',

  components: {},

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
      zoom: 9,
      maxZomm: undefined,
      minZoom: 3,
      center: [106.46281299898496, 29.631357102439466],
      tileLayer: [
        {
          url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=e60679f6e9718d3426f745fd8cd94cbd',
          layerName: 'img',
          style: 'default',
          format: '',
          matrixSet: 'w'
        },
        {
          url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=e60679f6e9718d3426f745fd8cd94cbd',
          layerName: 'cia',
          format: '',
          style: 'default',
          matrixSet: 'w'
        }
      ]
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style lang="less">
.map-container {
  position: relative;

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
