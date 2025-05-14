'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const missions = [
  { id: 1, lat: 45.75, lng: 4.85, statut: 'chargée' },
  { id: 2, lat: 45.77, lng: 4.83, statut: 'livrée' },
];

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
});

export default function TrackingAdminMap() {
  return (
    <MapContainer
      center={[45.76, 4.84]}
      zoom={12}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      {missions.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={customIcon}>
          <Popup>{m.statut}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
