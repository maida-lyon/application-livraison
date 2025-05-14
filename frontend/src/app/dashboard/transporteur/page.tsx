"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import SwitchStatus from "@/components/SwitchStatus";
import VehiculeForm from "@/components/VehiculeForm";
import MissionCard from "@/components/MissionCard";
import WorkflowForm from "@/components/WorkflowForm";
import UploadProof from "@/components/UploadProof";
import SignaturePad from "@/components/SignaturePad";
import ChatBot from "@/components/ChatBot";

const API = process.env.NEXT_PUBLIC_API_URL;
const TrackingMap = dynamic(() => import("@/components/TrackingMap"), {
  ssr: false,
  loading: () => <p>Chargement carte...</p>,
});

export default function TransporteurDashboard() {
  const [enLigne, setEnLigne] = useState(true);
  const [mode, setMode] = useState<"freight" | "distribution">("freight");
  const [missions, setMissions] = useState<any[]>([]);
  const [vehicule, setVehicule] = useState({
    type: "",
    longueur: "",
    largeur: "",
    hauteur: "",
    volumeMax: "",
    poidsMax: "",
    temperatureMin: "",
    options: [] as string[],
  });

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await axios.get(`${API}/api/commandes`, { withCredentials: true });
        setMissions(res.data);
      } catch (err) {
        console.error("Erreur chargement missions :", err);
      }
    };
    fetchMissions();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white text-black rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">Tableau de bord Transporteur</h1>

      {/* Statut et filtre */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SwitchStatus enLigne={enLigne} setEnLigne={setEnLigne} />
        <div className="flex gap-2">
          {["freight", "distribution"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`px-4 py-2 rounded-full font-semibold ${
                mode === m ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Véhicule */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🚛 Déclaration véhicule</h2>
        <VehiculeForm vehicule={vehicule} setVehicule={setVehicule} />
      </section>

      {/* Missions */}
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

      {/* Suivi mission */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🔄 Suivi mission</h2>
        <WorkflowForm />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <UploadProof name="preuveChargement" onChange={(e) => console.log("Preuve chargement :", e.target.files?.[0])} />
          <UploadProof name="preuveLivraison" onChange={(e) => console.log("Preuve livraison :", e.target.files?.[0])} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SignaturePad label="Signature chargement" name="signatureChargement" setForm={() => {}} />
          <SignaturePad label="Signature livraison" name="signatureLivraison" setForm={() => {}} />
        </div>
      </section>

      {/* Carte */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">🗺️ Localisation</h2>
        <TrackingMap />
      </section>

      {/* IA assistant */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
}
