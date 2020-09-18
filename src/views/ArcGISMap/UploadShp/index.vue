<template>
  <i-upload
    class="upload-shp"
    :show-upload-list="false"
    :multiple="uploadMultiple"
    :before-upload="handAddShpFile"
    action=""
  >
    <slot v-bind:loading="loading">
      <i-button
        size="default"
        icon="md-cloud-upload"
        :loading="loading"
        title="支持 shapefile 格式(请多选上传.shp, .dbf, .prj, .shx等文件)"
      >
        上传 shapefile (请多选上传.shp, .dbf, .prj, .shx等文件)
      </i-button>
    </slot>
  </i-upload>
</template>

<script>
import { debounce } from '@/utils'
import shapefile2geojson from '@/utils/map/shapefile2geojson'
import {
  featureCollectionProjection,
  multiFeatureCollectionToFeature
} from '../helpers/feature-helper'
import { getApi } from '../helpers/arcgis-api'

export default {
  name: 'UploadShp',

  components: {},

  static: {
    addShpFiles: []
  },

  props: {
    showMessage: {
      type: Boolean,
      default: true
    }
  },

  data() {
    const callback = this.checkFileFormat
    const addfilesDebounce = debounce(callback, 100)
    // 批量上传文件防抖
    return {
      uploadMultiple: true,
      loading: false,
      addfilesDebounce
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {
    this.$options.static.addShpFiles = []
  },

  methods: {
    handAddShpFile(file) {
      this.$options.static.addShpFiles.push(file)
      this.addfilesDebounce()
      return false
    },

    checkFileFormat() {
      const length = this.$options.static.addShpFiles.length
      const filesType = this.$options.static.addShpFiles.map(file => {
        const { name } = file
        const type = name.substr(name.lastIndexOf('.'))
        return type
      })

      if (length > 1) {
        let shpFiles = ['.shp', '.dbf', '.prj', '.shx']
        shpFiles = shpFiles.filter(item => !filesType.includes(item))
        const isLackFile = shpFiles.length >= 1
        if (isLackFile) {
          const message = `请完整上传 shapefile 文件(缺少${shpFiles.join('、')}文件)`
          this.showMessage && this.$Message.info({ content: message, duration: 5, closable: true })
          this.$emit('on-message', { type: 'error', message })
          this.$options.static.addShpFiles = []
        } else {
          this.convertVectorToGeoJson()
        }
      } else {
        const message = '请完整上传 shapefile 文件(包括.shp, .dbf, .prj, .shx文件等)'
        this.showMessage && this.$Message.info({ content: message, duration: 5, closable: true })
        this.$emit('on-message', { type: 'error', message })
        this.$options.static.addShpFiles = []
      }
    },

    async convertVectorToGeoJson() {
      this.loading = true

      const message = 'shapefile 文件格式转换中，请不要离开'
      let noticeMsg

      if (this.showMessage) {
        noticeMsg = this.$Message.loading({
          content: message,
          duration: 0
        })
      }
      this.$emit('on-start-convert', message)

      // const wkt_36 =
      //   'PROJCS["CGCS2000_3_Degree_GK_Zone_36",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",36500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",108.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
      // const wkt_35 =
      //   'PROJCS["CGCS2000_3_Degree_GK_Zone_35",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",35500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'

      const [projection, SpatialReference] = await getApi([
        'esri/geometry/projection',
        'esri/geometry/SpatialReference'
      ])

      let shpFile, dbfFile, prjFile
      this.$options.static.addShpFiles.forEach(file => {
        const type = file.name.slice(-3).toLowerCase()
        if (type === 'shp') {
          shpFile = file
        } else if (type === 'dbf') {
          dbfFile = file
        } else if (type === 'prj') {
          prjFile = file
        }
      })

      shapefile2geojson(shpFile, dbfFile, prjFile)
        .then(({ geoJson, wkt }) => {
          featureCollectionProjection(geoJson, wkt, projection, SpatialReference).then(
            ({ featureCollection, error }) => {
              noticeMsg && noticeMsg()
              this.$emit('on-end-convert')
              if (error) {
                this.showMessage && this.$Message.error(error)
                this.$emit('on-message', { type: 'error', message: error })
              } else {
                if (featureCollection.features[0].geometry) {
                  const _featureCollection = multiFeatureCollectionToFeature(featureCollection)

                  const message = 'shapefile 文件数据转换成功！'
                  this.showMessage && this.$Message.info({ content: message })
                  this.$emit('on-message', { type: 'success', message })
                  this.$emit('upload-geo-json', _featureCollection)
                } else {
                  const message = 'shapefile 文件坐标系不一致，数据转换失败！'
                  this.showMessage && this.$Message.error({ content: message })
                  this.$emit('on-message', { type: 'error', message })
                }
              }
            }
          )
        })
        .catch(error => {
          noticeMsg && noticeMsg()
          const message = 'shapefile 文件格式转换失败'
          this.showMessage && this.$Message.error(message)
          this.$emit('on-end-convert')
          this.$emit('on-message', { type: 'error', message })
        })
        .finally(() => {
          this.$options.static.addShpFiles = []
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less">
.upload-shp {
  .ivu-upload-select {
    width: 100%;
  }
}
</style>
