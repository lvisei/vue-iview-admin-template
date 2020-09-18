<template>
  <div class="upload-geo-range">
    <template v-if="!preview">
      <UploadShp
        :show-message="!showCustomMessage"
        @on-message="onMessageInflectPoints"
        @on-start-convert="onStartConvertInflectPoints"
        @on-end-convert="onEndConvertInflectPoints"
        @upload-geo-json="onConvertShpToGeoJson"
      >
        <template v-slot="{ loading }">
          <i-button
            size="small"
            icon="md-cloud-upload"
            :loading="loading"
            title="支持 shapefile 格式(请多选上传.shp, .dbf, .prj, .shx等文件)"
          >
            {{ geoRange ? '更新地块' : '上传 shapefile (请多选上传.shp, .dbf, .prj, .shx等文件)' }}
          </i-button>
        </template>
      </UploadShp>
    </template>
    <i-button v-if="geoRange" class="upload-geo-range__preview" size="small" @click="handClickPrew">
      预览地块
    </i-button>
    <i-modal
      :value="showEntryGentryeographicPane"
      width="80"
      footer-hide
      title="地块预览"
      @on-cancel="showEntryGentryeographicPane = false"
    >
      <SketchGraphic
        ref="sketchGraphic"
        v-if="showEntryGentryeographicPane"
        :geo-json="inputDataGeojson"
        :sketch="false"
        style="height: 700px;"
      />
    </i-modal>
  </div>
</template>

<script>
import Message from './Message'
import SketchGraphic from '@/views/ArcGISMap/SketchGraphic'
import UploadShp from '@/views/ArcGISMap/UploadShp'
// import UploadInflectPoints from '@/views/ArcGISMap/UploadInflectPoints'
import {
  multiPolygonToFeatureCollection,
  featureCollectionToMultiPolygon
} from '@/helpers/arcgis-map/feature-helper'

export default {
  name: 'UploadGeoRange',

  components: {
    SketchGraphic,
    UploadShp
  },

  model: {
    prop: 'geoRange',
    event: 'change'
  },

  props: {
    preview: {
      type: Boolean,
      default: false
    },
    showCustomMessage: {
      type: Boolean,
      default: true
    },
    geoRange: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      showEntryGentryeographicPane: false,
      inputDataGeojson: ''
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

  methods: {
    onMessageInflectPoints({ type, message }) {
      if (!this.showCustomMessage) return
      Message({
        type,
        message,
        duration: 5000,
        wrapperClassName: 'left-280',
        zIndex: '3000'
      })
    },

    onStartConvertInflectPoints(message) {
      if (!this.showCustomMessage) return
      this.convertIPMsg = Message.loading({
        message: message,
        wrapperClassName: 'left-280',
        zIndex: '3000'
      })
    },

    onEndConvertInflectPoints() {
      if (!this.showCustomMessage) return
      this.convertIPMsg && this.convertIPMsg.close()
    },

    handClickPrew() {
      this.showEntryGentryeographicPane = true
      this.inputDataGeojson = ''
      const geoJson = this.geoRange
      if (geoJson) {
        this.inputDataGeojson = multiPolygonToFeatureCollection(geoJson)
      }
    },

    onConvertShpToGeoJson(featureCollection) {
      const multiPolygonGeometry = featureCollectionToMultiPolygon(featureCollection)
      this.$emit('change', multiPolygonGeometry)
      this.$emit('on-upload', multiPolygonGeometry)
    }
  }
}
</script>

<style lang="less" scoped>
.upload-geo-range {
  display: flex;
  justify-content: center;
  align-items: center;

  &__preview {
    margin-left: 10px;
  }
}
</style>
