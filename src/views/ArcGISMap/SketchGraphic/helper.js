import { getType } from '@turf/turf'
import terraformerArcgisParser from 'terraformer-arcgis-parser'

export const geoJson2graphics = (
  featureCollection,
  Graphic,
  { spatialReferenceWkid = '4490', pointSymbol, polylineSymbol, polygonSymbol } = {}
) => {
  const graphics = []

  for (const currentFeature of featureCollection.features) {
    const graphicJson = terraformerArcgisParser.convert(currentFeature, {
      sr: spatialReferenceWkid
    })
    const {
      attributes: { _symbol }
    } = graphicJson
    if (_symbol) {
      graphicJson.symbol = _symbol
    }

    const graphic = Graphic.fromJSON(graphicJson)

    if (!_symbol) {
      const featureType = getType(currentFeature)
      const symbol =
        featureType === 'Point' || featureType === 'MultiPoint'
          ? pointSymbol
          : featureType === 'LineString' || featureType === 'MultiLineString'
          ? polylineSymbol
          : featureType === 'Polygon' || featureType === 'MultiPolygon'
          ? polygonSymbol
          : null
      graphic.symbol = symbol
    }

    graphics.push(graphic)
    // console.log('graphic: ', graphic)
  }

  return graphics
}

export const graphics2geoJson = graphics => {
  const features = graphics.map(graphic => {
    const graphicJson = graphic.toJSON()
    const { symbol } = graphicJson
    const feature = terraformerArcgisParser.parse(graphicJson)
    // feature.id = graphic.uid
    feature.properties._symbol = symbol
    const _feature = JSON.parse(JSON.stringify(feature))
    // hack: Geojson rfc794
    delete _feature.geometr
    return _feature
  })
  const geoJson = {
    type: 'FeatureCollection',
    features
  }

  return geoJson
}
