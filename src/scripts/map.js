import $ from 'jquery'
import GoogleMapsLoader from 'google-maps'

let g, map

export const locs = {
  beggars: { coordinates: [42.735814, -84.483501] },
  peanutBarrel: { coordinates: [42.733926, -84.477412] },
  riv: { coordinates: [42.735441, -84.481383] },
  pts: { coordinates: [42.735473, -84.483623] },
  hopcat: { coordinates: [42.735920, -84.481869] },
  crunchys: { coordinates: [42.736487, -84.487113] },
  dublin: { coordinates: [42.736567, -84.484127] },
  harpers: { coordinates: [42.736212, -84.482737] },
  ricks: null,
}

GoogleMapsLoader.load((google) => {
  g = google

  const options = {
    zoom: 16,
    center:  new g.maps.LatLng(...locs.pts.coordinates),
    mapTypeId: g.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }

  map = new g.maps.Map($('#map').get(0), options)

  Object.keys(locs).map((title, i) => {
    const l = locs[title]

    if (!l) {
      return
    }
    
    const { coordinates: [lat, lng] } = l

    const icon = {
      url: 'images/pin.svg',
      size: new g.maps.Size(65, 65),
      labelOrigin: new g.maps.Point(33, 28),
      origin: new g.maps.Point(0, 0),
      anchor: new g.maps.Point(0, 33)
    }

    l.marker = new g.maps.Marker({
     position: { lat, lng },
     map,
     title,
     label: {
       text: (i % Object.keys(locs).length) + 1 + '',
       fontSize: '16px',
       fontWeight: '600',
       color: 'rgba(255,255,255,0.8)'
     },
     icon
   })
 })
})

export function getMap() {
  return map
}

export function focusLoc(loc) {
  const m = locs[loc].marker
  m.setAnimation(g.maps.Animation.BOUNCE)
  setTimeout(() => m.setAnimation(null), 1400)
}

window.focusLoc = focusLoc
