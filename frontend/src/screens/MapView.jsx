import React from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default function MapView() {
  const mapRef = React.useRef(null)

  React.useEffect(() => {
    if (mapRef.current) return
    const map = L.map('map', { zoomControl: true }).setView([-1.286389, 36.817223], 12) // Nairobi CBD
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)
    L.marker([-1.286389, 36.817223]).addTo(map).bindPopup('Nairobi CBD')
    mapRef.current = map
  }, [])

  return <div id="map" style={{ height: 480, width: '100%', border: '1px solid #ddd' }} />
}


