// WGS84（WKID:4326）坐标系DPI
const dpi = 90.71428571427429
// 米 -> 度（地球球面） 转换系数
const meterToRadiusRatio = 111194.872221777
// 英尺 -> 米 转换系数
const inchToMeterRatio = 0.0254000508
//天地图底图缩放等级，从WMTS服务中获取
// const zoomLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
//天地图底图Scale Denominator，从WMTS服务中获取
const scaleDenominators = [
  2.958293554545656e8,
  1.479146777272828e8,
  7.39573388636414e7,
  3.69786694318207e7,
  1.848933471591035e7,
  9244667.357955175,
  4622333.678977588,
  2311166.839488794,
  1155583.419744397,
  577791.7098721985,
  288895.85493609926,
  144447.92746804963,
  72223.96373402482,
  36111.98186701241,
  18055.990933506204,
  9027.995466753102,
  4513.997733376551,
  2256.998866688275,
  1128.4994333441375
]
// 通过Scale Denominator计算分辨率
function calcResolution(scaleDenominator) {
  return (scaleDenominator * inchToMeterRatio) / (dpi * meterToRadiusRatio)
}
// 用于存储不同缩放等级下的切片信息的LOD数组对象
// const lodsArray = []
// zoomLevels.map(function(zoomLevel, idx) {
//   const scaleDenominator = scaleDenominators[idx]
//   lodsArray.push({
//     level: zoomLevel,
//     resolution: calcResolution(scaleDenominator),
//     scale: scaleDenominator
//   })
// })

const LODS = [
  { level: 0, levelValue: 1, resolution: 0.703125, scale: 2.958293554545656e8 },
  { level: 1, levelValue: 2, resolution: 0.3515625, scale: 1.479146777272828e8 },
  { level: 2, levelValue: 3, resolution: 0.17578125, scale: 7.39573388636414e7 },
  { level: 3, levelValue: 4, resolution: 0.087890625, scale: 3.69786694318207e7 },
  { level: 4, levelValue: 5, resolution: 0.0439453125, scale: 1.848933471591035e7 },
  { level: 5, levelValue: 6, resolution: 0.02197265625, scale: 9244667.357955175 },
  { level: 6, levelValue: 7, resolution: 0.010986328125, scale: 4622333.678977588 },
  { level: 7, levelValue: 8, resolution: 0.0054931640625, scale: 2311166.839488794 },
  { level: 8, levelValue: 9, resolution: 0.00274658203125, scale: 1155583.419744397 },
  { level: 9, levelValue: 10, resolution: 0.001373291015625, scale: 577791.7098721985 },
  { level: 10, levelValue: 11, resolution: 0.0006866455078125, scale: 288895.85493609926 },
  { level: 11, levelValue: 12, resolution: 0.00034332275390625, scale: 144447.92746804963 },
  { level: 12, levelValue: 13, resolution: 0.000171661376953125, scale: 72223.96373402482 },
  { level: 13, levelValue: 14, resolution: 8.58306884765625e-5, scale: 36111.98186701241 },
  { level: 14, levelValue: 15, resolution: 4.291534423828125e-5, scale: 18055.990933506204 },
  { level: 15, levelValue: 16, resolution: 2.1457672119140625e-5, scale: 9027.995466753102 },
  { level: 16, levelValue: 17, resolution: 1.0728836059570313e-5, scale: 4513.997733376551 },
  { level: 17, levelValue: 18, resolution: 5.3644180297851563e-6, scale: 2256.998866688275 },
  { level: 18, levelValue: 19, resolution: 2.68220901489257815e-6, scale: 1128.4994333441375 }
]

const getTdtTileInfo = (
  zoomLevels,
  origin = { x: -180, y: 90 },
  spatialReference = { wkid: 4490 }
) => {
  // const lods = new Array(zoomLevels).fill(zoomLevels).map((item, index) => ({
  //   level: index,
  //   levelValue: index + 1,
  //   resolution: calcResolution(scaleDenominators[index]),
  //   scale: scaleDenominators[index]
  // }))

  const lods = LODS.slice(0, zoomLevels)

  const tdtTileInfo = {
    dpi: dpi,
    size: [256, 256],
    origin,
    spatialReference,
    lods
  }
  return tdtTileInfo
}

export default getTdtTileInfo
