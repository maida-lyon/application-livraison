"use client";
import DocumentList from "@/components/DocumentList";
import IAValidation from "@/components/IAValidation";
import RibList from "@/components/RibList";
import LitigeList from "@/components/LitigeList";
import TrackingAdmin from "@/components/TrackingAdmin";
import ChatBot from "@/components/ChatBot";

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white text-black rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">🧑‍💼 Tableau de bord Admin</h1>

      {/* Documents à valider */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">📁 Documents à valider</h2>
        <DocumentList />
      </section>

      {/* Vérification automatique IA */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🤖 Validation IA (simulateur)</h2>
        <IAValidation />
      </section>

      {/* RIB */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">💳 RIB des transporteurs</h2>
        <RibList />
      </section>

      {/* Litiges */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">⚠️ Litiges déclarés</h2>
        <LitigeList />
      </section>

      {/* Suivi des missions */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">📦 Suivi global des missions</h2>
        <TrackingAdmin />
      </section>

      {/* Assistant IA */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
}
