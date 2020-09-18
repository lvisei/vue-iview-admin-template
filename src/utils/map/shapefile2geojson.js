import * as shapefile from 'shapefile'

const shapefile2geojson = (shp, dbf, prj, cpg) => {
  let wkt
  return Promise.all([
    readFileAsArrayBuffer(shp),
    readFileAsArrayBuffer(dbf),
    readFileAsText(prj),
    cpg && readFileAsText(cpg)
  ])
    .then(([_shp, _dbf, _prj, _cpg]) => {
      wkt = _prj
      return shapefile.read(_shp, _dbf, { encoding: _cpg || 'UTF-8' })
    })
    .then(geoJson => ({ geoJson, wkt }))
    .catch(error => Promise.reject(error))
}

const readFileAsArrayBuffer = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = event => {
      const result = event.target.result
      resolve(result)
    }

    reader.onerror = error => {
      reject(error)
    }
  })
}

const readFileAsText = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)

    reader.onload = event => {
      const result = event.target.result
      resolve(result)
    }

    reader.onerror = error => {
      reject(error)
    }
  })
}

export default shapefile2geojson
