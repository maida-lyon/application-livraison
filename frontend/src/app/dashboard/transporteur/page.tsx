'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SwitchStatus from '@/components/SwitchStatus'
import VehiculeForm from '@/components/VehiculeForm'
import MissionCard from '@/components/MissionCard'
import WorkflowForm from '@/components/WorkflowForm'
import UploadProof from '@/components/UploadProof'
import SignaturePad from '@/components/SignaturePad'
import ChatBot from '@/components/ChatBot'

// ✅ Composant potentiellement problématique avec window (map / leaflet)
const TrackingMap = dynamic(() => import('@/components/TrackingMap'), {
  ssr: false,
  loading: () => <p>Chargement de la carte…</p>,
})

type Mission = {
  id: number
  type: 'freight' | 'distribution'
  adresseChargement: string
  adresseLivraison: string
  typologie: string
  volume: number
  poids: number
  temperature: string
  statut: string
}

export default function TransporteurDashboard() {
  const [enLigne, setEnLigne] = useState(true)
  const [mode, setMode] = useState<'freight' | 'distribution'>('freight')

  const [vehicule, setVehicule] = useState({
    type: '',
    longueur: '',
    largeur: '',
    hauteur: '',
    volumeMax: '',
    poidsMax: '',
    temperatureMin: '',
    options: [] as string[],
  })

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      type: 'freight',
      adresseChargement: '10 rue de Lyon, 69003 Lyon',
      adresseLivraison: '25 rue Victor Hugo, 75011 Paris',
      typologie: 'palette',
      volume: 5,
      poids: 800,
      temperature: '4°C',
      statut: 'En attente',
    },
  ])

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white text-black rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">Tableau de bord transporteur</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SwitchStatus enLigne={enLigne} setEnLigne={setEnLigne} />
        <div className="flex gap-2">
          <button
            onClick={() => setMode('freight')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              mode === 'freight' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            FRET
          </button>
          <button
            onClick={() => setMode('distribution')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              mode === 'distribution' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            DISTRIBUTION
          </button>
        </div>
      </div>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🚛 Déclaration du véhicule</h2>
        <VehiculeForm vehicule={vehicule} setVehicule={setVehicule} />
      </section>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">📋 Missions disponibles</h2>
        {missions.filter((m) => m.type === mode).length === 0 ? (
          <p className="text-sm text-gray-500">Aucune mission disponible.</p>
        ) : (
          missions
            .filter((m) => m.type === mode)
            .map((mission) => <MissionCard key={mission.id} mission={mission} />)
        )}
      </section>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🔄 Suivi de mission</h2>
        <WorkflowForm />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <UploadProof
            name="preuveChargement"
            onChange={(e) => console.log('Photo chargement :', e.target.files?.[0])}
          />
          <UploadProof
            name="preuveLivraison"
            onChange={(e) => console.log('Photo livraison :', e.target.files?.[0])}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SignaturePad label="Signature chargement" name="signatureChargement" setForm={() => {}} />
          <SignaturePad label="Signature livraison" name="signatureLivraison" setForm={() => {}} />
        </div>
      </section>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🗺️ Localisation en temps réel</h2>
        <TrackingMap />
      </section>

      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  )
}
