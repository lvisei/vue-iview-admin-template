import { featureEach, getType } from '@turf/turf'
import terraformerArcgisParser from 'terraformer-arcgis-parser'

const getSymbol = (symbolColor = [51, 204, 51, 0.3]) => {
  const symbolSize = 2
  const textSymbol = {
    type: 'text',
    text: '',
    kerning: false,
    rotated: false,
    color: [115, 0, 0, 1]
  }
  const pointSymbol = {
    type: 'simple-marker',
    color: [255, 255, 255, 0.4],
    size: 10,
    outline: {
      color: symbolColor,
      width: symbolSize
    }
  }
  const polylineSymbol = {
    type: 'simple-line',
    color: symbolColor,
    width: symbolSize,
    style: 'solid'
  }
  const polygonSymbol = {
    type: 'simple-fill',
    color: [255, 255, 255, 0.4],
    style: 'solid',
    outline: {
      color: symbolColor,
      width: symbolSize
    }
  }

  return { pointSymbol, polylineSymbol, polygonSymbol }
}

export const featureCollectionToGraphics = (featureCollection, Graphic, color) => {
  const graphics = []

  featureEach(featureCollection, (currentFeature, featureIndex) => {
    const graphic = featureToGraphic(currentFeature, Graphic, color)

    graphics.push(graphic)
  })
  return graphics
}

export const featureToGraphic = (feature, Graphic, color) => {
  const { pointSymbol, polylineSymbol, polygonSymbol } = getSymbol(color)

  const graphicJson = terraformerArcgisParser.convert(feature, { sr: '4490' })
  const {
    attributes: { _symbol }
  } = graphicJson

  // if (_symbol) {
  //   graphicJson.symbol = _symbol
  // }

  const graphic = Graphic.fromJSON(graphicJson)

  // if (!_symbol) {
  const featureType = getType(feature)
  const symbol =
    featureType === 'Point' || featureType === 'MultiPoint'
      ? pointSymbol
      : featureType === 'LineString' || featureType === 'MultiLineString'
      ? polylineSymbol
      : featureType === 'Polygon' || featureType === 'MultiPolygon'
      ? polygonSymbol
      : null
  graphic.symbol = symbol
  // }

  // graphic.popupTemplate = graphicPreviewPopupTemplate()

  return graphic
}
