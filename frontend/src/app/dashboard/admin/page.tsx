'use client'

import dynamic from 'next/dynamic'
import DocumentList from '@/components/DocumentList'
import IAValidation from '@/components/IAValidation'
import RibList from '@/components/RibList'
import LitigeList from '@/components/LitigeList'
import ChatBot from '@/components/ChatBot'

// CHARGE TrackingAdmin UNIQUEMENT côté client
const TrackingAdmin = dynamic(() => import('@/components/TrackingAdmin'), {
  ssr: false,
  loading: () => <p>Chargement du module Tracking…</p>,
})

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white text-black rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">🧑‍💼 Tableau de bord Admin</h1>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">📁 Documents à valider</h2>
        <DocumentList />
      </section>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🤖 Validation IA</h2>
        <IAValidation />
      </section>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">💳 RIB des transporteurs</h2>
        <RibList />
      </section>

      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">⚠️ Litiges déclarés</h2>
        <LitigeList />
      </section>

      <TrackingAdmin />

      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  )
}
