import tdtTileInfo from './tdt-tile-info'

export const tdtTk = '87a17332e5e2b2af369e297c0546b231'

export const loadTdtVecLayer = (arcGisApi, projectionType = 'c', tk = tdtTk) => {
  const { WebTileLayer, TileInfo } = arcGisApi
  const layer = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(tdtTileInfo)
  })

  const layer_poi = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(tdtTileInfo)
  })

  layer.layerId = 'tdt_vec'
  layer_poi.layerId = 'tdt_cva'

  return [layer, layer_poi]
}

export const loadTdtImgLayer = (arcGisApi, projectionType = 'c', tk = tdtTk) => {
  const { WebTileLayer, TileInfo } = arcGisApi
  const layer = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=img_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(tdtTileInfo)
  })

  const layer_poi = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(tdtTileInfo)
  })

  layer.layerId = 'tdt_img'
  layer_poi.layerId = 'tdt_cia'

  return [layer, layer_poi]
}
