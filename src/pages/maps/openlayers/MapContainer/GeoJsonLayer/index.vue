<script>
import { bbox, featureCollection } from '@turf/turf'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

export default {
  name: 'GeoJsonLayer',

  inject: ['mapInstance'],

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
    return {}
  },

  computed: {},

  watch: {
    featureList(featureList) {
      this.renderGeoJson(featureList)
    }
  },

  created() {
    const { featureList } = this
    const map = this.mapInstance
    this.vectorSource = new VectorSource({
      features: []
    })
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      map: map
    })
    featureList.length && this.renderGeoJson(featureList)
  },

  render: function(h) {
    return h() // avoid warning message
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {
    const map = this.mapInstance
    map && map.removeLayer(this.vectorLayer)
  },

  methods: {
    renderGeoJson(featureList) {
      this.vectorSource.clear()
      if (!featureList.length) return

      const geoJSON = featureCollection(featureList)
      const extent = bbox(geoJSON)
      const map = this.mapInstance
      const view = map.getView()
      const features = new GeoJSON().readFeatures(geoJSON)

      this.vectorSource.addFeatures(features)

      view.fit(extent)
    }
  }
}
</script>

<style></style>
