import { area } from '@turf/turf'
import { rangeLineProjectColor } from '@/helpers/map-legend/color-style'
import { getPlot } from '@/helpers/plot'

const PLOT = getPlot()

export const generatePlotTableData = (classification, landList, oldPlotList, dynamic) => {
  let plotList, error

  if (classification === 'plan') {
    plotList = landList.map((item, index) =>
      Object.assign({}, PLOT, {
        // landCode: index + 1,
        landCode: item.landCode,
        belongtoUnit: item.belongtoUnit,
        landType: '10',
        arableWaterfield: item.arableWaterfield,
        arableDryland: item.arableDryland,
        arableWaterland: item.arableWaterland,
        sum: item.sum,
        gardenLand: item.gardenLand,
        woodLand: item.woodLand,
        grassLand: item.grassLand,
        waterandequipmentLand: item.waterandequipmentLand,
        transporttationLand: item.transporttationLand,
        townandworkLand: item.townandworkLand,
        otherLand: item.otherLand,
        landArea: item.landArea,
        basicFarmlandWaterfield: item.basicFarmlandWaterfield
      })
    )
  } else if (['design', 'completion'].includes(classification)) {
    const landType = 'design' === classification ? '20' : 30
    if (!dynamic && oldPlotList.length) {
      if (oldPlotList.length !== landList.length * 2) {
        error = `地块数量不匹配，请上传完整表格！`
        return { error }
      }
      plotList = oldPlotList.map((item, index) => {
        const isEven = index % 2 === 0
        const land = landList[Math.floor(index / 2)][isEven ? 'reclamtionBfore' : 'reclamtionAfter']
        return Object.assign(
          item,
          land,
          isEven ? {} : { belongtoUnit: '-', basicFarmlandWaterfield: 9999999 },
          {
            landType,
            landCode: item.landCode
          }
        )
      })
    } else {
      plotList = landList
        .map((item, index) => [
          Object.assign({}, item.reclamtionBfore, {
            landType,
            landRangeGeojson: ''
          }),
          Object.assign({}, item.reclamtionAfter, {
            landType,
            belongtoUnit: '-',
            basicFarmlandWaterfield: 9999999,
            landRangeGeojson: ''
          })
        ])
        .flat()
    }
  }

  return { plotList }
}

export const generatePlotListData = (classification, oldPlotList, featureList) => {
  let plotList, error

  if (['design', 'completion'].includes(classification)) {
    if (oldPlotList.length) {
      if (oldPlotList.length !== featureList.length * 2) {
        error = `地块数量不匹配，请上传完整地块范围！`
        return { error }
      }
      plotList = oldPlotList.map((item, index) => ({
        ...item,
        landRangeGeojson: featureList[Math.floor(index / 2)].multiPolygonGeometry
      }))
    }
  } else if (classification === 'plan') {
    if (oldPlotList.length !== featureList.length) {
      error = `地块数量不匹配，请上传完整地块范围！`
      return { error }
    }
    plotList = oldPlotList.map((item, index) => ({
      ...item,
      landRangeGeojson: featureList[index].multiPolygonGeometry
      // cellClassName: {
      //   landArea: 'plot-table-worn-cell-landArea'
      // }
    }))
  } else if (classification === 'approval') {
    if (oldPlotList.length) {
      if (oldPlotList.length !== featureList.length) {
        error = `地块数量不匹配，请上传完整地块范围！`
        return { error }
      }
      plotList = oldPlotList.map((item, index) => ({
        ...item,
        landRangeGeojson: featureList[index].multiPolygonGeometry
      }))
    } else {
      plotList = featureList.map(({ multiPolygonGeometry }, index) => ({
        landCode: '',
        landRangeGeojson: multiPolygonGeometry
      }))
    }
  } else {
    if (oldPlotList.length && oldPlotList.length !== featureList.length) {
      error = `地块数量不匹配，请上传完整地块范围！`
      return { error }
    }
    plotList = oldPlotList.map((item, index) => ({
      ...item,
      landRangeGeojson: featureList[index].multiPolygonGeometry
    }))
  }

  return { plotList }
}

export const detectPlotListAreaSum = (plotList, featureList, coefficient = 1) => {
  let error,
    detectResults = []
  featureList = calculateFeaturesArea(featureList)
  // console.log('featureList: ', featureList)

  for (let index = 0; index < plotList.length; index++) {
    const { landCode, landArea } = plotList[index]
    const { area } = featureList[index]
    // console.log('landArea: ', landArea)
    // console.log('area: ', area)

    const difference = landArea - area
    const differenceAbs = Math.abs(difference)
    const coefficientArea = (area / 100) * coefficient
    // console.log('difference: ', difference)
    differenceAbs >= coefficientArea && detectResults.push(landCode)
  }

  return { detectResults }
}

export const calculateFeaturesArea = featurelist => {
  const _featurelist = featurelist.map(item => Object.assign(item, { area: area(item.feature) }))
  return _featurelist
}

export const getNewPlot = (classification, oldPlotList) => {
  let newPlot = []
  if (classification === 'plan') {
    const landCode = `000${oldPlotList.length + 1}`
    newPlot = [Object.assign({}, PLOT, { landType: '10', landCode })]
  } else if (['design', 'completion'].includes(classification)) {
    const landCode = `000${oldPlotList.length / 2 + 1}`
    const landType = 'design' === classification ? '20' : 30
    newPlot = [
      Object.assign({}, PLOT, { landType, landCode, landCategory: '复垦前' }),
      Object.assign({}, PLOT, {
        landType,
        landCode,
        landCategory: classification === 'design' ? '拟复垦' : '复垦后',
        belongtoUnit: '-',
        basicFarmlandWaterfield: 9999999
      })
    ]
  }
  const plotList = oldPlotList.concat(newPlot)
  return plotList
}

export const formatPreviewPlotList = plotList => {
  if (rangeLineProjectColor.length) {
    return plotList.map(item => {
      const index = rangeLineProjectColor.findIndex(({ value }) => value === item.landType)
      return Object.assign(item, {
        landColor: index !== -1 ? rangeLineProjectColor[index].color : [0, 170, 255, 0.8]
      })
    })
  } else {
    return plotList
  }
}
