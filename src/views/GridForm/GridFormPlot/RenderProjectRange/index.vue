<script>
import { multiPolygonToFeatureCollection } from '@/helpers/arcgis-map/feature-helper'
import { featureCollectionToGraphics } from '@/helpers/arcgis-map/graphic-helper'

export default {
  name: 'RenderProjectRange',

  inject: ['mapInstance'],

  components: {},

  props: {
    projectRange: String
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  render() {
    return createElement => {
      return []
    }
  },

  created() {
    const { projectRange } = this
    if (!projectRange) return
    const { view, map, arcgisApi } = this.mapInstance
    this.view = view
    this.arcgisApi = arcgisApi
    const { Graphic, GraphicsLayer } = this.arcgisApi

    this.graphicLayer = new GraphicsLayer()
    map.add(this.graphicLayer)

    const featureCollection = multiPolygonToFeatureCollection(projectRange)
    const graphics = featureCollectionToGraphics(JSON.parse(featureCollection), Graphic, [
      51,
      204,
      51,
      0.4
    ])
    this.graphicLayer.addMany(graphics)
    this.view.goTo(graphics)
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style></style>
