'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
})

export default function TrackingMapClient({
  latitude = 45.75,
  longitude = 4.85,
  statut = 'préparée',
}: {
  latitude?: number
  longitude?: number
  statut?: string
}) {
  return (
    <div className="mt-6 w-full h-64">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>
            Transporteur - Statut : <strong>{statut}</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
