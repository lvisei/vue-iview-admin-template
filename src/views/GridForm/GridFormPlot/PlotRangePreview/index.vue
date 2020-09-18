<template>
  <MapContainer class="plot-range-preview" :toolbar="false" @on-load="onMapLoad">
    <slot />
  </MapContainer>
</template>

<script>
import MapContainer from '@/views/ArcGISMap/MapContainer'
import { getType } from '@turf/turf'
import terraformerArcgisParser from 'terraformer-arcgis-parser'
import { multiPolygonToFeatureCollection } from '@/helpers/arcgis-map/feature-helper'

export default {
  name: 'PlotRangePreview',

  components: { MapContainer },

  props: {
    plotList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {}
  },

  computed: {},

  watch: {
    plotList(plotList) {
      if (this.graphicLayer) {
        this.graphicLayer.removeAll()
        const graphics = this.loadGraphics(plotList)
        this.graphicLayer.addMany(graphics)
        this.view.goTo(graphics)
      }
    }
  },

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    onMapLoad({ view, arcgisApi }) {
      this.view = view
      this.arcgisApi = arcgisApi

      const { map } = this.view
      const { GraphicsLayer } = this.arcgisApi

      this.graphicLayer = new GraphicsLayer()
      map.add(this.graphicLayer)

      if (this.plotList.length) {
        const graphics = this.loadGraphics(this.plotList)
        this.graphicLayer.addMany(graphics)
        this.view.goTo(graphics)
      }

      this.$emit('on-load', {
        view: this.view,
        arcgisApi: this.arcgisApi,
        graphicLayer: this.graphicLayer
      })
    },

    loadGraphics(plotList) {
      if (!plotList.length) return

      const { projection, SpatialReference, Graphic } = this.arcgisApi
      const spatialReferenceWkid = '4490'
      const graphics = []

      const featureCollectionList = plotList.map(({ landColor, landRangeGeojson }) => ({
        landColor,
        featureCollection: landRangeGeojson
          ? JSON.parse(multiPolygonToFeatureCollection(landRangeGeojson))
          : { features: [] }
      }))

      for (let index = 0; index < featureCollectionList.length; index++) {
        const { landColor, featureCollection } = featureCollectionList[index]

        for (const currentFeature of featureCollection.features) {
          const graphicJson = terraformerArcgisParser.convert(currentFeature, {
            sr: spatialReferenceWkid
          })

          const graphic = Graphic.fromJSON(graphicJson)

          const featureType = getType(currentFeature)
          if (featureType === 'Polygon' || featureType === 'MultiPolygon') {
            graphic.symbol = this.getPolygonSymbol(landColor)
          }

          graphic.attributes = { index }

          graphics.push(graphic)
          // console.log('graphic: ', graphic)
        }
      }

      return graphics
    },

    getPolygonSymbol(landColor) {
      return {
        type: 'simple-fill',
        color: [255, 255, 255, 0],
        style: 'solid',
        outline: {
          color: landColor ? landColor : [0, 170, 255, 0.8],
          width: 2
        }
      }
    }
  }
}
</script>

<style lang="less"></style>
