import GeojsonProjector from 'geojson-projector'

/**
 * GeoJson project
 * @param {String} from wkt
 * @param {String} to wkt
 * @param {Object,Array} geojson
 * @returns
 */
const geojsonProjector = (from, to, geojson) => {
  const project = GeojsonProjector(from, to)
  return project(geojson)
}

export default geojsonProjector
