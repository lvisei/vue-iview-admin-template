import mapboxgl from 'mapbox-gl'

const accessToken =
  'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p1dHRybDR5MGJuZjQzcGhrZ2doeGgwNyJ9.a-vxW4UaxOoUMWUTGnEArw'

export const loadMap = container => {
  mapboxgl.accessToken = accessToken

  const map = new mapboxgl.Map({
    container: container,
    zoom: 2,
    center: [106.46281299898496, 29.631357102439466],
    style: 'mapbox://styles/mapbox/streets-v11'
  })

  const nav = new mapboxgl.NavigationControl()

  map.addControl(nav, 'top-left')

  return map
}
