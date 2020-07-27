import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'
import { applyTransform } from 'ol/extent'
import { get as getProjection, getTransform } from 'ol/proj'

export const generateProjection = (code, name, proj4def, bbox) => {
  const newProjCode = 'EPSG:' + code
  proj4.defs(newProjCode, proj4def)
  register(proj4)
  const newProj = getProjection(newProjCode)
  const fromLonLat = getTransform('EPSG:4326', newProj)

  let worldExtent = [bbox[1], bbox[2], bbox[3], bbox[0]]
  newProj.setWorldExtent(worldExtent)

  // approximate calculation of projection extent,
  // checking if the world extent crosses the dateline
  if (bbox[1] > bbox[3]) {
    worldExtent = [bbox[1], bbox[2], bbox[3] + 360, bbox[0]]
  }
  var extent = applyTransform(worldExtent, fromLonLat, undefined, 8)
  newProj.setExtent(extent)
  return newProj
}

const projection4490 = generateProjection(
  '4490',
  'China Geodetic Coordinate System 2000',
  '+proj=longlat +ellps=GRS80 +no_defs',
  [53.56, 73.62, 16.7, 134.77]
)
