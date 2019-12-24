<template>
  <i-card class="openlayers" shadow :padding="5">
    <MapContainer />
  </i-card>
</template>

<script>
import MapContainer from './MapContainer'

export default {
  name: 'Openlayers',

  components: { MapContainer },

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

  methods: {}
}
</script>

<style lang="less">
.openlayers {
  .vl-map {
    height: 600px;
  }
}
</style>
