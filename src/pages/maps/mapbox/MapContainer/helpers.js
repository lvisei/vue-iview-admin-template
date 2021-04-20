import mapboxgl from 'mapbox-gl'
import { extentControl } from './controls'

const accessToken =
  'pk.eyJ1IjoibGl1dmlnb25nenVvc2hpIiwiYSI6ImNrbmowaHg3dzNlaXoydm1xbDBlOHhqbTMifQ.k3sY00btPhFbuJOVIBNV_Q'

export const loadMap = container => {
  mapboxgl.accessToken = accessToken

  const map = new mapboxgl.Map({
    container: container,
    zoom: 2,
    center: [106.46281299898496, 29.631357102439466],
    style: 'mapbox://styles/mapbox/streets-v11'
  })

  // const nav = new mapboxgl.NavigationControl()
  // map.addControl(nav, 'top-left')

  extentControl(map)

  return map
}
