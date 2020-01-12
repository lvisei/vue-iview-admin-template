<template>
  <MapContainer class="sketch-graphic" @on-load="onMapLoad">
    <MapPosition class="sketch-graphic__map-position" />
    <SearchBar />
    <SketchGraphicAttribute
      :attributes="attributesList"
      v-if="attribute && showAttributePane"
      @on-save="onSaveAttribute"
    />
    <slot />
  </MapContainer>
</template>

<script>
import { getType } from '@turf/turf'
import terraformerArcgisParser from 'terraformer-arcgis-parser'
import MapContainer from '@/views/ArcGISMap/MapContainer'
import MapPosition from '@/views/ArcGISMap/MapPosition'
import SearchBar from '@/views/ArcGISMap/SearchBar'
import SketchGraphicAttribute from './Attribute'

export default {
  name: 'SketchGraphic',

  components: { MapContainer, MapPosition, SearchBar, SketchGraphicAttribute },

  filters: {},

  props: {
    symbolSize: {
      type: Number,
      default: 2
    },

    //绘制的点的颜色
    symbolColor: {
      type: Array,
      default: () => [0, 170, 255, 0.8]
    },

    drawType: {
      type: Array,
      default: () => ['point', 'polyline', 'polygon']
    },

    geoJson: {
      type: String,
      default: ''
    },

    sketch: {
      type: Boolean,
      default: true
    },

    attribute: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showAttributePane: false,
      attributesList: []
    }
  },

  computed: {
    pointSymbol() {
      return {
        type: 'simple-marker',
        color: [255, 255, 255, 0.4],
        size: 10,
        outline: {
          color: this.symbolColor,
          width: this.symbolSize
        }
      }
    },

    polylineSymbol() {
      return {
        type: 'simple-line',
        color: this.symbolColor,
        width: this.symbolSize,
        style: 'solid'
      }
    },

    polygonSymbol() {
      return {
        type: 'simple-fill',
        color: [255, 255, 255, 0.4],
        style: 'solid',
        outline: {
          color: this.symbolColor,
          width: this.symbolSize
        }
      }
    }
  },

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

      const { map } = this.view
      const { GraphicsLayer } = this.arcGisApi

      this.sketchGraphicLayer = new GraphicsLayer()
      map.add(this.sketchGraphicLayer)

      // this.geoJson =
      // '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[106.79367111778079,26.692622652106472],[106.80822981303747,26.681159967408576],[106.8143925235253,26.66970691596436],[106.77864270067036,26.67535644084133],[106.79367111778079,26.692622652106472]]]},"properties":{"_symbol":{"type":"esriSFS","color":[255,255,255,102],"outline":{"type":"esriSLS","color":[0,170,255,204],"width":2,"style":"esriSLSSolid"},"style":"esriSFSSolid"}}},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[106.76545729642929,26.689639739044377],[106.74596501296583,26.676115002390507],[106.75067329561534,26.675351946978257]]},"properties":{"_symbol":{"type":"esriSLS","color":[0,170,255,204],"width":2,"style":"esriSLSSolid"}}},{"type":"Feature","geometry":{"type":"Point","coordinates":[106.77590047722876,26.689137986105575]},"properties":{"_symbol": {"type":"esriSMS","color":[255,255,255,102],"angle":0,"xoffset":0,"yoffset":0,"size":10,"style":"esriSMSCircle","outline":{"type":"esriSLS","color":[0,170,255,204],"width":2,"style":"esriSLSSolid"}}}}]}'

      if (this.geoJson) {
        const graphics = this.loadGraphics(this.geoJson)
        // console.log('JSON.stringify(graphics): ', JSON.stringify(graphics))
        this.sketchGraphicLayer.addMany(graphics)
        this.view.goTo(graphics)
      }

      if (this.sketch) {
        const sketch = this.initSketch()
        this.sketchWidget = sketch
        this.view.ui.add(sketch, 'top-right')
      }

      this.$emit('on-load', {
        view: this.view,
        arcGisApi: this.arcGisApi,
        sketchGraphicLayer: this.sketchGraphicLayer
      })
    },

    loadGraphics(geoJson) {
      const { projection, SpatialReference, Graphic } = this.arcGisApi
      const featureCollection = JSON.parse(geoJson)
      const spatialReferenceWkid = '4490'
      const graphics = []
      // const graphicAttributesList = []

      for (const currentFeature of featureCollection.features) {
        const graphicJson = terraformerArcgisParser.convert(currentFeature, {
          sr: spatialReferenceWkid
        })
        // console.log('graphicJson: ', graphicJson)
        const {
          attributes: { _symbol }
        } = graphicJson
        if (_symbol) {
          graphicJson.symbol = _symbol
        }

        const graphic = Graphic.fromJSON(graphicJson)

        if (!_symbol) {
          const featureType = getType(currentFeature)
          // console.log('featureType: ', featureType)
          const symbol =
            featureType === 'Point' || featureType === 'MultiPoint'
              ? this.pointSymbol
              : featureType === 'LineString' || featureType === 'MultiLineString'
              ? this.polylineSymbol
              : featureType === 'Polygon' || featureType === 'MultiPolygon'
              ? this.polygonSymbol
              : null
          graphic.symbol = symbol
        }

        graphics.push(graphic)
        // console.log('graphic: ', graphic)
      }

      return graphics
    },

    initSketch() {
      const { Sketch } = this.arcGisApi
      const availableCreateTools = this.drawType.includes('polygon')
        ? this.drawType.concat(['rectangle', 'circle'])
        : this.drawType
      const sketch = new Sketch({
        layer: this.sketchGraphicLayer,
        view: this.view,
        creationMode: 'update',
        availableCreateTools: availableCreateTools,
        defaultUpdateOptions: {
          toggleToolOnClick: false // only reshape operation will be enabled
        }
      })

      sketch.viewModel.pointSymbol = this.pointSymbol
      sketch.viewModel.polylineSymbol = this.polylineSymbol
      sketch.viewModel.polygonSymbol = this.polygonSymbol

      sketch.on(['create', 'update'], event => {
        const { state, type, graphics } = event
        if (state === 'complete' && type === 'create') {
          // this.getSketchGeoJson()
        } else if (state === 'cancel' && type === 'update') {
          this.showAttributePane = false
        } else if (state === 'start' && type === 'update') {
          const [graphic] = graphics
          const { attributes } = graphic
          const ignoreKey = ['achievementName', 'departmentName', '_symbol']
          const attributeTep = [{ fieldName: '', value: '' }]
          if (attributes) {
            const attributesKey = Object.entries(attributes).filter(
              item => !ignoreKey.includes(item[0])
            )
            const fieldInfos = attributesKey.map(item => ({ fieldName: item[0], value: item[1] }))
            this.attributesList = fieldInfos.length ? fieldInfos : attributeTep
          } else {
            this.attributesList = attributeTep
          }
          this.showAttributePane = true
          this.currentAttributeGraphic = graphic
        }
      })
      return sketch
    },

    getSketchGeoJson() {
      const { sketchGraphicLayer } = this
      const features = sketchGraphicLayer.graphics.items.map(graphic => {
        const graphicJson = graphic.toJSON()
        // console.log('graphicJson: ', JSON.stringify(graphicJson))
        const { symbol } = graphicJson
        const feature = terraformerArcgisParser.parse(graphicJson)
        // feature.id = graphic.uid
        feature.properties._symbol = symbol
        const _feature = JSON.parse(JSON.stringify(feature))
        // hack: Geojson rfc794
        delete _feature.geometr
        // console.log('_feature: ', _feature)
        return _feature
      })
      const geoJson = {
        type: 'FeatureCollection',
        features
      }

      return geoJson
    },

    onSaveAttribute(attributeList) {
      const { currentAttributeGraphic, sketchWidget } = this
      if (currentAttributeGraphic) {
        const attributes = {}
        attributeList.forEach(item => {
          attributes[item.fieldName] = item.value
        })
        currentAttributeGraphic.attributes = {
          ...currentAttributeGraphic.attributes,
          ...attributes
        }
      }
      sketchWidget && sketchWidget.cancel()
    }
  }
}
</script>

<style lang="less">
.sketch-graphic {
  &__map-position {
    left: 0;
    bottom: 0;
  }
}
</style>
