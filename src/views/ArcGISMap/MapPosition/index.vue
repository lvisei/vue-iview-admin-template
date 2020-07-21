<template>
  <div class="map-position">
    <!-- <p class="map-position__level">Level：{{ zoom }}</p> -->
    <p class="map-position__zoom">
      经度: {{ pointer.lng.toFixed(4) }} 纬度: {{ pointer.lat.toFixed(4) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MapPosition',

  inject: ['view'],

  components: {},

  filters: {},

  props: {
    position: {
      type: String,
      default: 'topright'
    }
  },

  data() {
    return {
      zoom: 0,
      pointer: { lat: 0, lng: 0 }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.bindViewHandler()
  },

  updated() {},

  destroyed() {},

  methods: {
    bindViewHandler() {
      this.view.on('pointer-move', event => {
        const { x, y } = event
        const point = this.view.toMap({ x, y })
        const { latitude, longitude } = point
        // TODO: 防抖
        this.pointer = { lat: latitude, lng: longitude }
        // this.$utils.debounce(() => {}, 1000)
      })
    }
  }
}
</script>

<style lang="less">
.map-position {
  position: absolute;

  &__zoom {
    font-size: 12px;
    line-height: 17px;
    background: rgba(255, 255, 255, 0.5);
    padding: 0 10px;
  }
}
</style>
