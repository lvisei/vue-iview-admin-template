<script>
import { optionsMerger, propsBinder, findRealParent } from 'vue2-leaflet/dist/utils/utils.js'
import TileLayerWMS from 'vue2-leaflet/dist/mixins/TileLayerWMS.js'
import Options from 'vue2-leaflet/dist/mixins/Options.js'
import { tileLayer, DomEvent } from 'leaflet'

export default {
  name: 'LWMSTileLayer',
  mixins: [TileLayerWMS, Options],
  props: {
    baseUrl: {
      type: String,
      default: null,
      custom: true
    },
    layers: {
      type: String,
      default: '',
      custom: true
    },
    format: {
      type: String,
      default: 'image/png'
    },
    transparent: {
      type: Boolean,
      custom: false,
      default: true
    }
  },
  mounted() {
    const options = optionsMerger(this.tileLayerWMSOptions, this)
    this.mapObject = tileLayer.wms(this.baseUrl, options)
    DomEvent.on(this.mapObject, this.$listeners)
    propsBinder(this, this.mapObject, this.$options.props)
    this.parentContainer = findRealParent(this.$parent)
    this.parentContainer.addLayer(this, !this.visible)
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject)
    })
  },

  methods: {
    setBaseUrl(newVal, oldVal) {
      if (newVal === oldVal) return
      this.parentContainer.removeLayer(this)
      this.tileLayerWMSOptions = {
        ...this.tileLayerOptions,
        layers: this.layers,
        format: this.format,
        transparent: this.transparent
      }
      const options = optionsMerger(this.tileLayerWMSOptions, this)
      this.mapObject = tileLayer.wms(newVal, options)
      if (this.visible) {
        this.parentContainer.addLayer(this)
      }
    },
    setLayers(newVal, oldVal) {
      if (newVal === oldVal) return
      this.parentContainer.removeLayer(this)
      this.tileLayerWMSOptions = {
        ...this.tileLayerOptions,
        layers: newVal,
        format: this.format,
        transparent: this.transparent
      }
      const options = optionsMerger(this.tileLayerWMSOptions, this)
      this.mapObject = tileLayer.wms(this.baseUrl, options)
      if (this.visible) {
        this.parentContainer.addLayer(this)
      }
    }
  }
}
</script>
