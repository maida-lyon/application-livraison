'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// On charge react-leaflet dynamiquement pour éviter tout import de `window` côté serveur
const LeafletMap = dynamic(() => import('./TrackingMapClient'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
})

export default function TrackingMapWrapper({
  latitude = 45.75,
  longitude = 4.85,
  statut = 'préparée',
}: {
  latitude?: number
  longitude?: number
  statut?: string
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <p>Préparation de la carte...</p>

  return <LeafletMap latitude={latitude} longitude={longitude} statut={statut} />
}
