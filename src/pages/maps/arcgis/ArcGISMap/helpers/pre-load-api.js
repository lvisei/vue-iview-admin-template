import { loadCss, loadScript, loadModules } from 'esri-loader'
import { ARCGIS_API_URL, ARCGIS_CSS_URL } from '@/config'

// NOTE: Pre-loading the ArcGIS API for JavaScript
loadScript({ url: ARCGIS_API_URL })

loadCss(ARCGIS_CSS_URL)
