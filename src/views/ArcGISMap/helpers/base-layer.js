import getTdtTileInfo from './tdt-tile-info'

export const tdtTk = '87a17332e5e2b2af369e297c0546b231'

export const getTdtVecLayers = ({ WebTileLayer, TileInfo }, projectionType = 'c', tk = tdtTk) => {
  const layer = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(getTdtTileInfo(19))
  })

  const layer_poi = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(getTdtTileInfo(19))
  })

  layer.layerId = 'tdt_vec'
  layer_poi.layerId = 'tdt_cva'

  return [layer, layer_poi]
}

export const getTdtImgLayers = ({ WebTileLayer, TileInfo }, projectionType = 'c', tk = tdtTk) => {
  const layer = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=img_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(getTdtTileInfo(18))
  })

  const layer_poi = new WebTileLayer({
    urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=cia_${projectionType}&x={col}&y={row}&l={level}&tk=${tk}`,
    spatialReference: { wkid: 4490 },
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tileInfo: new TileInfo(getTdtTileInfo(18))
  })

  layer.layerId = 'tdt_img'
  layer_poi.layerId = 'tdt_cia'

  return [layer, layer_poi]
}

export const getTdtVecLayersByWMTS = ({ WMTSLayer }, projectionType = 'c', tk = tdtTk) => {
  const layer = new WMTSLayer({
    url: `http://t0.tianditu.gov.cn/vec_${projectionType}/wmts`,
    customParameters: { tk: '871d4cd31ca475ac00f30fd7c563b61d' },
    serviceMode: 'KVP'
  })
  const layer_poi = new WMTSLayer({
    url: `http://t0.tianditu.gov.cn/cva_${projectionType}/wmts`,
    customParameters: { tk: '871d4cd31ca475ac00f30fd7c563b61d' },
    serviceMode: 'KVP'
  })

  layer.layerId = 'tdt_vec'
  layer_poi.layerId = 'tdt_cva'

  return [layer, layer_poi]
}

export const getTdtImgLayersByWMTS = ({ WMTSLayer }, projectionType = 'c', tk = tdtTk) => {
  const layer = new WMTSLayer({
    url: `http://t0.tianditu.gov.cn/img_${projectionType}/wmts`,
    customParameters: { tk: '871d4cd31ca475ac00f30fd7c563b61d' },
    serviceMode: 'KVP'
  })
  const layer_poi = new WMTSLayer({
    url: `http://t0.tianditu.gov.cn/cia_${projectionType}/wmts`,
    customParameters: { tk: '871d4cd31ca475ac00f30fd7c563b61d' },
    serviceMode: 'KVP'
  })

  layer.layerId = 'tdt_img'
  layer_poi.layerId = 'tdt_cia'

  return [layer, layer_poi]
}
