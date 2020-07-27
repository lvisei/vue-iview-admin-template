import TileLayer from 'ol/layer/Tile'
// import ImageLayer from 'ol/layer/Image'
// import OSM from 'ol/source/OSM'
import WMTS from 'ol/source/WMTS'
// import ImageArcGISRest from 'ol/source/ImageArcGISRest'
// import TileArcGISRest from 'ol/source/TileArcGISRest'

import WMTSTileGrid from 'ol/tilegrid/WMTS'

import { get as getProjection } from 'ol/proj'
import { getWidth, getTopLeft } from 'ol/extent'

const projection = getProjection('EPSG:4326')
const projectionExtent = projection.getExtent()
const size = getWidth(projectionExtent) / 256
const resolutions = new Array(19)
const matrixIds = new Array(19)
for (let z = 0; z < 19; ++z) {
  resolutions[z] = size / Math.pow(2, z)
  matrixIds[z] = z
}

const tdtLayers = [
  new TileLayer({
    source: new WMTS({
      url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=e60679f6e9718d3426f745fd8cd94cbd',
      layer: 'img',
      matrixSet: 'c',
      format: 'tiles',
      projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      style: 'default',
      wrapX: true
    })
  }),
  new TileLayer({
    source: new WMTS({
      url: 'http://t0.tianditu.gov.cn/cia_c/wmts?tk=e60679f6e9718d3426f745fd8cd94cbd',
      layer: 'cia',
      matrixSet: 'c',
      format: 'tiles',
      projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      style: 'default',
      wrapX: true
    })
  })
]

// const tdtcqLayers = [
//   new TileLayer({
//     source: new TileArcGISRest({
//       params: {},
//       projection: 'EPSG:4490',
//       url: 'http://100.100.2.49/server/rest/services/czkj/tdtcqImg/MapServer'
//     })
//   }),
//   new TileLayer({
//     source: new TileArcGISRest({
//       params: {},
//       projection: 'EPSG:4490',
//       url: 'http://100.100.2.49/server/rest/services/czkj/tdtcqImgAnno/MapServer'
//     })
//   }),
//   new ImageLayer({
//     source: new ImageArcGISRest({
//       ratio: 1,
//       params: {},
//       projection: 'EPSG:4490',
//       url: 'http://192.168.0.70/arcgis/rest/services/cqTest/MapServer'
//     })
//   })
// ]

const baseLayers = tdtLayers

export default baseLayers
