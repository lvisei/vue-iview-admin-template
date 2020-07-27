/**
 * isGeographicCoordinateSystems 是否是地理坐标系
 * @param {String}} wkt
 * @param {Boolean}
 * @returns
 */
export const isGeographicCoordinateSystems = wkt => {
  return wkt.startsWith('GEOGCS')
}

/**
 * isProjectedCoordinateSystems 是否是投影坐标系
 * @param {String}} wkt
 * @param {Boolean}
 * @returns
 */
export const isProjectedCoordinateSystems = wkt => {
  return wkt.startsWith('PROJCS')
}

/**
 * isSupportedProjection 是否是投影坐标系
 * @param {projection} projection
 * @param {Boolean}
 * @returns
 */
export const isSupportedProjection = projection => {
  return projection.isSupported()
}

/**
 * geometry 投影坐标与经纬度坐标互转
 * @param {projection} projection
 * @param {Geometry} geometry
 * @param {SpatialReference} outSpatialReference
 * @returns
 */
export const geometryProjection = (projection, geometry, outSpatialReference) => {
  if (!projection.isSupported()) {
    console.error('projection is not supported')
    return new Promise((resolve, reject) => {
      reject('projection is not supported')
    })
  }
  return projection.load().then(() => {
    const _geometry = projection.project(geometry, outSpatialReference)
    return _geometry
  })
}

/**
 * example
const polygonGraphic = new Graphic({
  geometry: {
    type: 'polygon',
    rings: [
      [
        [370928.62540000025, 2942341.4696999993],
        [370914.04289999977, 2942321.1820999999],
        [370909.91959999967, 2942358.2583000008],
        [370921.59520000033, 2942349.6307999995],
        [370919.84119999968, 2942347.1919999998],
        [370928.62540000025, 2942341.4696999993]
      ]
    ],
    spatialReference: {
      // wkid or wkt
      wkt:
        'PROJCS["CGCS2000_3_Degree_GK_CM_108E",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",108.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
    }
  }
})
const outSpatialReference = new SpatialReference({
  // view‘s spatialReference
  wkid: 4490
})

geometryProjection(projection, polygonGraphic.geometry, outSpatialReference).then(geometry=> {}).catch()
 */
