import React from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default function MapView() {
  const mapRef = React.useRef(null)
  const [scores, setScores] = React.useState([])

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

  React.useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch('/api/scores')
        const data = await res.json()
        setScores(data)
      } catch {}
    }
    fetchScores()
  }, [])

  return (
    <div>
      <div id="map" style={{ height: 480, width: '100%', border: '1px solid #ddd' }} />
      <div style={{ marginTop: 8 }}>
        <strong>Scores (latest 100)</strong>
        <ul>
          {scores.map(s => (
            <li key={s._id}>{s.routeId} — R:{s.reliability} S:{s.safety} @ {s.timeBucket}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}


