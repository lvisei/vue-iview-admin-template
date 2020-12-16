import 'mapbox-gl-controls/theme.css'

import ZoomControl from 'mapbox-gl-controls/lib/zoom'
import CompassControl from 'mapbox-gl-controls/lib/compass'
import RulerControl from 'mapbox-gl-controls/lib/ruler'
import StylesControl from 'mapbox-gl-controls/lib/styles'
// import InspectControl from 'mapbox-gl-controls/lib/inspect'
// import TooltipControl from 'mapbox-gl-controls/lib/tooltip'

export const extentControl = map => {
  map.addControl(new ZoomControl(), 'top-left')
  map.addControl(new CompassControl(), 'top-left')
  // map.addControl(new InspectControl(), 'bottom-right')
  // map.addControl(new TooltipControl({ layer: '$fill' }))

  // map controls
  map.addControl(new RulerControl({ units: 'miles' }), 'bottom-left')

  // with custom styles:
  map.addControl(
    new StylesControl({
      styles: [
        {
          label: 'Streets',
          styleName: 'Mapbox Streets',
          styleUrl: 'mapbox://styles/mapbox/streets-v11'
        },
        // {
        //   label: 'Light',
        //   styleName: 'Mapbox Light',
        //   styleUrl: 'mapbox://styles/mapbox/light-v10'
        // },
        // {
        //   label: 'Dark',
        //   styleName: 'Mapbox Dark',
        //   styleUrl: 'mapbox://styles/mapbox/dark-v10'
        // },
        // {
        //   label: 'Outdoors',
        //   styleName: 'Mapbox Outdoors',
        //   styleUrl: 'mapbox://styles/mapbox/outdoors-v11'
        // },
        {
          label: 'Satellite',
          styleName: 'Satellite',
          styleUrl: 'mapbox://styles/mapbox/satellite-v9'
        }
      ],
      onChange: style => console.log(style)
    }),
    'top-right'
  )
}
