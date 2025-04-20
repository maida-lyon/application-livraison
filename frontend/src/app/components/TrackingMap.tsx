'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// 👇 1. Typage explicite des props
interface Props {
  latitude?: number
  longitude?: number
  statut?: string
}

// 👇 2. Import dynamique avec typage
const LeafletMap = dynamic<Props>(() => import('./TrackingMapClient'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
})

export default function TrackingMapWrapper({
  latitude = 45.75,
  longitude = 4.85,
  statut = 'préparée',
}: Props) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <p>Préparation de la carte...</p>

  return <LeafletMap latitude={latitude} longitude={longitude} statut={statut} />
}
