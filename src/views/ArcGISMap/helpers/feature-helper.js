import {
  point,
  lineString,
  polygon,
  featureCollection,
  featureEach,
  getCoords,
  multiPolygon,
  getGeom,
  getType
} from '@turf/turf'
import terraformerArcgisParser from 'terraformer-arcgis-parser'
import {
  geometryProjection,
  isProjectedCoordinateSystems,
  isSupportedProjection
} from './geometry-projection'

/**
 * 基于ArcGIS API GeoJson投影坐标转地理坐标
 * @param {Object} featureCollection
 * @param {string} wkt
 * @param {Class} projection
 * @param {Class} SpatialReference
 * @returns { featureCollection, error }
 */
export const featureCollectionProjection = async (
  featureCollection,
  wkt,
  projection,
  SpatialReference
) => {
  const isPCS = isProjectedCoordinateSystems(wkt)
  if (isPCS) {
    if (isSupportedProjection(projection)) {
      const spatialReferenceWkid = null
      for (let featureIndex = 0; featureIndex < featureCollection.features.length; featureIndex++) {
        const currentFeature = featureCollection.features[featureIndex]
        const graphicJson = terraformerArcgisParser.convert(currentFeature, {
          sr: spatialReferenceWkid
        })

        graphicJson.geometry.spatialReference = { wkt: wkt, wkid: null }
        const outSpatialReference = new SpatialReference({ wkid: 4490 })

        const _geometry = await geometryProjection(
          projection,
          graphicJson.geometry,
          outSpatialReference
        )

        graphicJson.geometry = _geometry

        featureCollection.features[featureIndex] = terraformerArcgisParser.parse(graphicJson)
      }
      return { featureCollection, error: null }
    } else {
      return {
        featureCollection,
        error: '浏览器版本过低不支持坐标系转换，请使用最新版谷歌浏览器！'
      }
    }
  } else {
    return { featureCollection, error: null }
  }
}

/**
 * 简化多点/线/面的 GeoJson 数据
 * @param {*} featureCollection
 * @returns featureCollection
 */
export const multiFeatureCollectionToFeature = featureCollection => {
  const features = []
  featureEach(featureCollection, (currentFeature, featureIndex) => {
    const featureType = getType(currentFeature)
    if (featureType === 'MultiPoint') {
      const {
        geometry: { coordinates }
      } = currentFeature
      const point_Features = coordinates.map((coordinates, index) =>
        point(coordinates, currentFeature.properties, {
          id: currentFeature.id
        })
      )
      features.push(...point_Features)
    } else if (featureType === 'MultiLineString') {
      const {
        geometry: { coordinates }
      } = currentFeature
      const lineString_Features = coordinates.map((coordinates, index) =>
        lineString(coordinates, currentFeature.properties, { id: currentFeature.id })
      )
      features.push(...lineString_Features)
    } else if (featureType === 'MultiPolygon') {
      const {
        geometry: { coordinates }
      } = currentFeature
      const polygon_Features = coordinates.map((coordinates, index) =>
        polygon(coordinates, currentFeature.properties, { id: currentFeature.id })
      )
      features.push(...polygon_Features)
    } else {
      features.push(currentFeature)
    }
  })
  featureCollection.features = features

  return featureCollection
}

/**
 * 多面 multiPolygon 转 GeoJson 数据
 * @param {string} multiPolygon_geometry_string
 * @returns featureCollection
 */
export const multiPolygonToFeatureCollection = multiPolygon_geometry_string => {
  const _multiPolygon_geometry = JSON.parse(multiPolygon_geometry_string)
  const { coordinates } = _multiPolygon_geometry
  const polygon_Features = coordinates.map(coordinates => polygon(coordinates))
  const _featureCollection = featureCollection(polygon_Features)

  return JSON.stringify(_featureCollection)
}

/**
 * GeoJson 转多面 multiPolygon 数据
 * @param {Object} featureCollection
 * @returns multiPolygon_geometry
 */
export const featureCollectionToMultiPolygon = featureCollection => {
  const multiPolygon_coords = []
  featureEach(featureCollection, function(currentPolygonFeature, featureIndex) {
    if (getType(currentPolygonFeature) === 'Polygon') {
      const coords = getCoords(currentPolygonFeature)
      multiPolygon_coords.push(coords)
    }
  })

  const _multiPolygon = multiPolygon(multiPolygon_coords)
  const multiPolygon_geometry = getGeom(_multiPolygon)
  const _multiPolygon_geometry = JSON.stringify(multiPolygon_geometry)

  return _multiPolygon_geometry
}

/**
 * Feature 转多面 multiPolygon 数据
 * @param {Object} feature
 * @returns multiPolygon_geometry
 */
export const featureToMultiPolygon = feature => {
  const multiPolygon_coords = []
  if (getType(feature) === 'Polygon') {
    const coords = getCoords(feature)
    multiPolygon_coords.push(coords)
  }

  const _multiPolygon = multiPolygon(multiPolygon_coords)
  const multiPolygon_geometry = getGeom(_multiPolygon)
  const _multiPolygon_geometry = JSON.stringify(multiPolygon_geometry)

  return _multiPolygon_geometry
}
