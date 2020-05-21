import { setDefaultOptions, loadScript, loadModules } from 'esri-loader'
import { loadTdtVecLayer, loadTdtImgLayer } from './../helpers/base-layer'

// NOTE: module, not global scope
let _ArcgisApi

// NOTE: Pre-loading the ArcGIS API for JavaScript
// loadScript({url: arcgisApiUrl})

// this will be called by the map component
export function loadArcgisApi() {
  return loadModules(
    [
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Search',
      'esri/Basemap',
      'esri/widgets/BasemapToggle',
      'esri/layers/WebTileLayer',
      'esri/layers/support/TileInfo',
      'esri/widgets/Home',
      'esri/widgets/ScaleBar',
      'esri/widgets/Compass',
      'esri/geometry/Point',
      'esri/geometry/Extent'
    ],
    { css: true, insertCssBefore: 'style' }
  ).then(
    ([
      Map,
      MapView,
      Search,
      Basemap,
      BasemapToggle,
      WebTileLayer,
      TileInfo,
      Home,
      ScaleBar,
      Compass,
      Point,
      Extent
    ]) => {
      _ArcgisApi = {
        Map,
        MapView,
        Search,
        Basemap,
        BasemapToggle,
        WebTileLayer,
        TileInfo,
        Home,
        ScaleBar,
        Compass,
        Point,
        Extent
      }
      return _ArcgisApi
    }
  )
}

// this will be called by the component that needs to add the graphic to the map
export function addGraphicToMap(view, graphicJson) {
  // make sure that the graphic class has already been loaded
  const { Graphic } = _ArcgisApi
  if (!_ArcgisApi) {
    throw new Error('You must load a map before creating new graphics')
  }
  view.graphics.add(new Graphic(graphicJson))
}

export async function loadMap(element, { search }) {
  const {
    Map,
    MapView,
    Search,
    Basemap,
    BasemapToggle,
    WebTileLayer,
    TileInfo,
    Home,
    ScaleBar,
    Compass,
    Point,
    Extent
  } = await loadArcgisApi()

  const basemap_tdt_vec = new Basemap({
    baseLayers: [...loadTdtVecLayer(_ArcgisApi)],
    thumbnailUrl: 'http://lbs.tianditu.gov.cn/images/vec_c.png',
    title: 'basemap_tdt_vec',
    id: 'basemap_tdt_vec'
  })
  const basemaptdt_img = new Basemap({
    baseLayers: [...loadTdtImgLayer(_ArcgisApi)],
    thumbnailUrl: 'http://lbs.tianditu.gov.cn/images/img_c.png',
    title: 'basemaptdt_img',
    id: 'basemaptdt_img'
  })

  const map = new Map({
    basemap: basemaptdt_img
  })
  const gzs_bbox = [103.601439, 24.61822, 119.597385, 39.221005]
  const gzs_extent = new Extent({
    xmin: gzs_bbox[0],
    ymin: gzs_bbox[1],
    xmax: gzs_bbox[2],
    ymax: gzs_bbox[3],
    spatialReference: { wkid: 4490 }
  })

  const view = new MapView({
    container: element,
    map: map,
    zoom: 3,
    center: new Point({
      x: 106.6274,
      y: 26.693,
      spatialReference: 4490
    }),
    extent: gzs_extent,
    spatialReference: {
      wkid: 4490
    },
    logo: false
  })

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: basemap_tdt_vec
  })
  view.ui.add(basemapToggle, {
    position: 'bottom-right'
  })

  // const homeWidget = new Home({
  //   view: view,
  // viewpoint: new Viewpoint()
  // })
  // view.ui.add(homeWidget, 'top-left')

  if (search) {
    const searchWidget = new Search({
      view: view,
      id: 'search'
    })
    view.ui.add(searchWidget, {
      position: 'top-right'
    })
  }

  const scaleBar = new ScaleBar({
    view: view,
    id: 'scaleBar',
    unit: 'metric'
  })
  view.ui.add(scaleBar, {
    position: 'bottom-left'
  })

  const compass = new Compass({
    view: view,
    id: 'compass'
  })
  view.ui.add(compass, 'top-left')

  return { view, map, _ArcgisApi }
}
