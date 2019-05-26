<template>
  <l-control class="l-control-position" :position="position" ref="myControl">
    <!-- <p class="l-control-position__level">Level：{{zoom}}</p> -->
    <p class="l-control-position__zoom">
      经度: {{ center.lng.toFixed(4) }} 纬度: {{ center.lat.toFixed(4) }}
    </p>
  </l-control>
</template>

<script>
import { LControl } from 'vue2-leaflet'

export default {
  name: 'LControlPosition',

  components: {
    LControl
  },

  filters: {},

  props: {
    position: {
      type: String,
      default: 'topright'
    },
    zoom: {
      type: Number,
      default: 0
    },
    center: {
      type: Object,
      default: () => ({ lat: 0, lng: 0 })
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

  methods: {}
}
</script>

<style lang="less">
.leaflet-right .leaflet-control.l-control-position {
  margin-right: 5px;
}

.leaflet-bottom .leaflet-control.l-control-position {
  margin-bottom: 5px;
}

.leaflet-left .leaflet-control.l-control-position {
  margin-left: 5px;
}

.leaflet-top .leaflet-control.l-control-position {
  margin-top: 5px;
}

.l-control-position {
  font-size: 12px;
  line-height: 17px;
  // background: rgba(255, 255, 255, 0.5);
  // padding: 0 10px;
}
</style>
