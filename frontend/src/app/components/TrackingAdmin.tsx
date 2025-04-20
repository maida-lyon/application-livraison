'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const exampleMissions = [
  { id: 1, lat: 45.75, lng: 4.85, statut: 'chargée' },
  { id: 2, lat: 45.77, lng: 4.83, statut: 'livrée' },
]

export default function TrackingAdminMap() {
  return (
    <MapContainer
      center={[45.76, 4.84]}
      zoom={12}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {exampleMissions.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} />
      ))}
    </MapContainer>
  )
}
