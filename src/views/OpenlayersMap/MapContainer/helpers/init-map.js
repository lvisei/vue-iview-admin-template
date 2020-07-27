import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'

import './projection'
import baseLayers from './base-layers'

export const initMap = (target, zoom, center) => {
  const layers = baseLayers
  const view = new View({
    center: center,
    zoom: zoom,
    minZoom: 3,
    projection: 'EPSG:4490'
  })
  const map = new Map({
    view,
    layers,
    target: target
  })
  return map
}
