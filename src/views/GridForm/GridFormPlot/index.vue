<template>
  <div class="grid-form-plot">
    <!-- <i-tag v-if="schema.suffix" class="grid-form-plot__suffix">单位:{{ schema.suffix }}</i-tag> -->
    <PlotRangePreview
      v-if="preview"
      :plotList="formatPreviewPlotList(model[schema.field])"
      style="height: 400px;"
      @on-load="onLoadPlotPreview"
    />

    <PlotTable
      class="grid-form-plot__table"
      :columns="schema.columns"
      :plot-list="model[schema.field]"
      :field="schema.field"
      :preview="preview"
      :dynamic="schema.dynamic"
      :max-height="tableMaxHeight"
      :classification="classification"
      :highlight-row="preview"
      :highlight-rows="highlightRows"
      v-bind="schema.props"
      @on-click-plot="handClickLandPlot"
      @on-delete-plot="handDeleteLandPlot"
    />

    <template v-if="!preview">
      <div class="grid-form-plot__tools">
        <i-button
          v-if="schema.dynamic"
          class="grid-form-plot__tool-upload"
          icon="md-add"
          size="default"
          @click="handAddPlot"
        >
          新增地块
        </i-button>
        <i-upload
          v-if="schema.upload && schema.upload.action"
          class="grid-form-plot__tool-upload"
          :action="baseUrl + schema.upload.action"
          :data="schema.upload.data"
          :multiple="false"
          :show-upload-list="false"
          :format="['xlsx']"
          :on-progress="_ => (uploadTableLoading = true)"
          :on-error="_ => (uploadTableLoading = false)"
          :on-format-error="handleUploadFormatError"
          :before-upload="handleUpload"
          :on-success="onUploadSuccess"
        >
          <!-- disabled -->
          <i-button icon="md-cloud-upload" size="default" long>
            导入表格
          </i-button>
        </i-upload>

        <template v-if="schema.upload && model[schema.field].length">
          <!-- <UploadInflectPoints
            class="grid-form-plot__tool-upload"
            :show-message="!showCustomMessage"
            @on-message="onMessageInflectPoints"
            @on-start-convert="onStartConvertInflectPoints"
            @on-end-convert="onEndConvertInflectPoints"
            @upload-geo-json="onConvertInflectionPoints"
          >
            <template v-slot="{ loading }">
              <i-button
                size="default"
                icon="md-cloud-upload"
                long
                :loading="loading"
                title="支持拐点文件格式(.txt格式)"
              >
                {{ model[schema.field][0].landRangeGeojson ? '更新地块' : '上传拐点文件(.txt格式)' }}
                上传拐点文件(.txt格式)
              </i-button>
            </template>
          </UploadInflectPoints> -->
          <UploadShp
            class="grid-form-plot__tool-upload"
            :show-message="!showCustomMessage"
            @on-message="onMessageInflectPoints"
            @on-start-convert="onStartConvertInflectPoints"
            @on-end-convert="onEndConvertInflectPoints"
            @upload-geo-json="onConvertShpToGeoJson"
          >
            <template v-slot="{ loading }">
              <Button
                size="default"
                icon="md-cloud-upload"
                :loading="loading"
                long
                title="支持 shapefile 格式(请多选上传.shp, .dbf, .prj, .shx等文件)"
              >
                上传 shapefile (请多选上传.shp, .dbf, .prj, .shx等文件)
              </Button>
            </template>
          </UploadShp>
        </template>
      </div>

      <i-modal
        :value="showEntryGentryeographicPane"
        width="80"
        title="地块预览"
        footer-hide
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
    </template>
  </div>
</template>

<script>
import PlotTable from './PlotTable'
import Message from '../components/Message'
import PlotRangePreview from './PlotRangePreview'
import UploadShp from '@/views/ArcGISMap/UploadShp'
import SketchGraphic from '@/views/ArcGISMap/SketchGraphic'
// import UploadInflectPoints from '@/views/ArcGISMap/UploadInflectPoints'
import {
  multiPolygonToFeatureCollection,
  featureToMultiPolygon
} from '@/helpers/arcgis-map/feature-helper'
import {
  generatePlotTableData,
  generatePlotListData,
  detectPlotListAreaSum,
  getNewPlot,
  formatPreviewPlotList
} from './helper'

export default {
  name: 'GridFormPlot',

  components: {
    PlotTable,
    PlotRangePreview,
    SketchGraphic,
    UploadShp
  },

  props: {
    model: Object,
    schema: Object,
    preview: Boolean

    // plotList: Array
  },

  data() {
    const baseUrl = process.env.VUE_APP_BASE_URL
    return {
      baseUrl,
      showEntryGentryeographicPane: false,
      inputDataGeojson: '',
      uploadTableLoading: false,
      highlightRows: []
    }
  },

  computed: {
    classification() {
      const { classification } = this.schema
      // plan、design、completion、approval
      return classification
    },

    tableMaxHeight() {
      return this.preview ? '300' : this.schema.props['max-height']
    },

    showCustomMessage() {
      return this.classification !== 'approval'
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
    formatPreviewPlotList,

    handAddPlot() {
      const { classification } = this
      const oldPlotList = this.model[this.schema.field]
      const plotList = getNewPlot(classification, oldPlotList)
      this.model[this.schema.field] = plotList
    },

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

    onConvertInflectionPoints({ featureList }) {
      const { classification } = this
      const oldPlotList = this.model[this.schema.field]

      const { error, plotList } = generatePlotListData(classification, oldPlotList, featureList)

      if (error) {
        Message.error({
          message: error,
          duration: 5000,
          wrapperClassName: this.showCustomMessage ? 'left-280' : '',
          zIndex: '3000'
        })
        return
      }

      this.model[this.schema.field] = plotList

      this.inspectionPlotListArea(classification, plotList, featureList)
    },

    inspectionPlotListArea(classification, plotList, featureList) {
      if (!['plan', 'design', 'completion'].includes(classification)) {
        return
      }

      const noticeMsg = Message.loading({
        message: '图斑面积计算对比检测中！',
        wrapperClassName: 'left-280'
      })

      const coefficient = 1
      const _plotList =
        classification === 'plan' ? plotList : plotList.filter((_, index) => index % 2 !== 0)

      const { err, detectResults } = detectPlotListAreaSum(_plotList, featureList, coefficient)

      noticeMsg.close()

      if (detectResults.length) {
        // const { suffix } = this.schema
        const suffix = '%'
        Message.warning({
          title: '图斑面积对比检测结果',
          message: `<div style="line-height: 1.2">
            <p>上传地块坐标有误！地块面积不在容差(${coefficient}${suffix})范围内。请检查以下地块编号的地块：</p>
            <p style="padding-top: '5px'; font-weight: 450">${detectResults.join('，')}</p>
            </div>`,
          wrapperClassName: 'left-280',
          duration: 60000,
          showClose: true,
          supportHTML: true
        })
      } else {
        Message.success({
          message: '图斑面积对比检测结果：上传地块坐标正确！',
          duration: 5000,
          wrapperClassName: 'left-280'
        })
      }
    },

    onConvertShpToGeoJson(featureCollection) {
      const Indexkey = 'BH'
      const hasNotIndexkey = featureCollection.features.some(
        ({ properties }) => !properties || properties[Indexkey] === undefined
      )
      if (hasNotIndexkey) {
        Message.error({
          message: `shapefile 文件缺少属性字段${Indexkey}(编号)`,
          duration: 5000,
          wrapperClassName: this.showCustomMessage ? 'left-280' : '',
          zIndex: '3000'
        })
        return
      }
      const featureList = featureCollection.features
        .sort(
          ({ properties: preProperties }, { properties: nextProperties }) =>
            preProperties[Indexkey] - nextProperties[Indexkey]
        )
        .map(feature => ({
          feature,
          multiPolygonGeometry: featureToMultiPolygon(feature)
        }))
      this.onConvertInflectionPoints({ featureList })
    },

    handleUploadFormatError(file) {
      Message.error({
        message: `上传文件${file.name}格式不正确`,
        duration: 5000,
        wrapperClassName: 'left-280',
        zIndex: '3000'
      })
    },

    handleUpload(file) {
      // const { name } = file
      // const dataExtension = name.substr(name.lastIndexOf('.'))
      // this.$emit('on-upload', file)
      // return false
    },

    onUploadSuccess(response, file, fileList) {
      const { code, data, message } = response
      if (code !== 200000) {
        Message.error({
          message: message,
          wrapperClassName: 'left-280',
          zIndex: '3000'
        })
        this.uploadTableLoading = false
        return
      }

      const { classification, schema } = this
      const oldPlotList = this.model[this.schema.field]
      const { error, plotList } = generatePlotTableData(
        classification,
        data,
        oldPlotList,
        schema.dynamic
      )

      if (error) {
        Message.error({
          message: error,
          wrapperClassName: 'left-280',
          zIndex: '3000'
        })
        return
      }

      this.model[this.schema.field] = plotList

      this.uploadTableLoading = false
    },

    handViewAllLand() {
      this.showEntryGentryeographicPane = true
      this.inputDataGeojson = ''
      const featureCollectionList = this.model[this.schema.field].map(({ landRangeGeojson }) =>
        JSON.parse(multiPolygonToFeatureCollection(landRangeGeojson))
      )
      const featureList = featureCollectionList.map(({ features }) => features).flat()
      const featureCollection = JSON.stringify({ type: 'FeatureCollection', features: featureList })
      this.inputDataGeojson = featureCollection
    },

    handClickLandPlot({ plot, index }) {
      if (this.preview) {
        this.loationLandPlot(index)
      } else {
        this.showEntryGentryeographicPane = true
        this.inputDataGeojson = ''
        if (plot.landRangeGeojson) {
          this.inputDataGeojson = multiPolygonToFeatureCollection(plot.landRangeGeojson)
        }
      }
    },

    handDeleteLandPlot({ index }) {
      const { classification } = this
      const plotList = this.model[this.schema.field]
      if (['design', 'completion'].includes(classification)) {
        plotList.splice(index, 2)
      } else {
        plotList.splice(index, 1)
      }
    },

    onLoadPlotPreview({ view, graphicLayer }) {
      this.view = view
      this.graphicLayer = graphicLayer
      view.on('click', event => {
        const screenPoint = { x: event.x, y: event.y }
        view.hitTest(screenPoint).then(response => {
          if (response.results.length) {
            const graphic = response.results.filter(
              result => result.graphic.layer === graphicLayer
            )[0].graphic
            const graphicIndex = graphic.attributes.index
            const rowIndex = this.model[this.schema.field].findIndex(
              (_, index) => graphicIndex === index
            )
            this.highlightRows = [rowIndex]
          }
        })
      })
    },

    loationLandPlot(index) {
      const graphic = this.graphicLayer.graphics.items.find(
        graphic => graphic.attributes.index === index
      )
      graphic && this.view.goTo(graphic)
    }
  }
}
</script>

<style lang="less">
.grid-form-plot {
  position: relative;
  width: 100%;

  .ivu-upload-select {
    width: 100%;
  }

  &__table {
    width: 100%;
    overflow: hidden;
  }

  &__tools {
    padding: 10px;
    display: flex;
  }

  &__tool-upload {
    flex: 1;

    & + & {
      margin-left: 10px;
    }
  }

  &__suffix {
    position: absolute;
    top: -25px;
    right: 0;
    border-radius: 0;
  }
}
</style>
