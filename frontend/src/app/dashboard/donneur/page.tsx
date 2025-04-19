"use client";
import { useState } from "react";
import AdresseForm from "@/components/AdresseForm";
import UploadProof from "@/components/UploadProof";
import SignaturePad from "@/components/SignaturePad";
import QrCodeDisplay from "@/components/QrCodeDisplay";
import Commentaire from "@/components/Commentaire";
import ChatBot from "@/components/ChatBot";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function DonneurDashboard() {
  const [type, setType] = useState<"freight" | "distribution">("freight");

  const [form, setForm] = useState<any>({
    entrepriseChargement: "",
    numeroRueChargement: "",
    nomRueChargement: "",
    codePostalChargement: "",
    villeChargement: "",
    contactChargement: "",
    telephoneChargement: "",
    responsableChargement: "",
    signatureChargement: "",
    photoChargement: null,
    commentaireChargement: "",

    entrepriseLivraison: "",
    numeroRueLivraison: "",
    nomRueLivraison: "",
    codePostalLivraison: "",
    villeLivraison: "",
    contactLivraison: "",
    telephoneLivraison: "",
    responsableLivraison: "",
    signatureLivraison: "",
    photoLivraison: null,
    commentaireLivraison: "",

    typologie: "palette",
    poids: "",
    longueur: "",
    largeur: "",
    hauteur: "",
    temperature: "",
    quantite: 1,
    zone: "",
    hub: "",
    prix: "",
  });

  const calculVolume = () => {
    const l = parseFloat(form.longueur) || 0;
    const L = parseFloat(form.largeur) || 0;
    const h = parseFloat(form.hauteur) || 0;
    const q = parseInt(form.quantite) || 1;
    return ((l * L * h * q) / 1000000).toFixed(2);
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (type === "distribution" && parseFloat(form.poids) > 15) {
      alert("⚠️ En distribution, le poids max est 15 kg.");
      return;
    }

    const volume = calculVolume();

    const data = new FormData();
    Object.entries({ ...form, type, volume }).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value); // fichier image
        } else {
          data.append(key, String(value)); // string forcée
        }
      });
      

    try {
      await axios.post(`${API}/api/commandes`, data);
      alert("✅ Commande créée avec succès.");
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de la création.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white text-black rounded-xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-center">Créer une commande</h1>

      {/* SWITCH FREIGHT / DISTRIBUTION */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setType("freight")}
          className={`px-5 py-2 rounded-full font-semibold transition ${type === "freight" ? "bg-black text-white" : "bg-gray-200"}`}
        >
          FRET
        </button>
        <button
          onClick={() => setType("distribution")}
          className={`px-5 py-2 rounded-full font-semibold transition ${type === "distribution" ? "bg-black text-white" : "bg-gray-200"}`}
        >
          DISTRIBUTION
        </button>
      </div>

      {/* CHARGEMENT */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-3">📦 Lieu de chargement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="entrepriseChargement" placeholder="Entreprise" onChange={handleChange} className="input" />
          <input name="contactChargement" placeholder="Contact" onChange={handleChange} className="input" />
          <input name="telephoneChargement" placeholder="Téléphone" onChange={handleChange} className="input" />
          <input name="responsableChargement" placeholder="Responsable" onChange={handleChange} className="input" />
          <input name="numeroRueChargement" placeholder="N° Rue" onChange={handleChange} className="input" />
          <input name="nomRueChargement" placeholder="Nom Rue" onChange={handleChange} className="input" />
          <input name="codePostalChargement" placeholder="Code Postal" onChange={handleChange} className="input" />
          <input name="villeChargement" placeholder="Ville" onChange={handleChange} className="input" />
        </div>
        <UploadProof name="photoChargement" onChange={handleChange} />
        <Commentaire value={form.commentaireChargement} onChange={(e) => setForm({ ...form, commentaireChargement: e.target.value })} />
        <SignaturePad label="Signature du responsable" name="signatureChargement" setForm={setForm} />
      </section>

      {/* LIVRAISON */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-3">🚚 Lieu de livraison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="entrepriseLivraison" placeholder="Entreprise" onChange={handleChange} className="input" />
          <input name="contactLivraison" placeholder="Contact" onChange={handleChange} className="input" />
          <input name="telephoneLivraison" placeholder="Téléphone" onChange={handleChange} className="input" />
          <input name="responsableLivraison" placeholder="Responsable" onChange={handleChange} className="input" />
          <input name="numeroRueLivraison" placeholder="N° Rue" onChange={handleChange} className="input" />
          <input name="nomRueLivraison" placeholder="Nom Rue" onChange={handleChange} className="input" />
          <input name="codePostalLivraison" placeholder="Code Postal" onChange={handleChange} className="input" />
          <input name="villeLivraison" placeholder="Ville" onChange={handleChange} className="input" />
        </div>
        <UploadProof name="photoLivraison" onChange={handleChange} />
        <Commentaire value={form.commentaireLivraison} onChange={(e) => setForm({ ...form, commentaireLivraison: e.target.value })} />
        <SignaturePad label="Signature du réceptionnaire" name="signatureLivraison" setForm={setForm} />
      </section>

      {/* MARCHANDISE */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-3">📦 Marchandise</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input name="typologie" placeholder="Typologie" onChange={handleChange} className="input" />
          <input name="quantite" placeholder="Quantité" type="number" onChange={handleChange} className="input" />
          <input name="poids" placeholder="Poids total (kg)" onChange={handleChange} className="input" />
          <input name="longueur" placeholder="Longueur (cm)" onChange={handleChange} className="input" />
          <input name="largeur" placeholder="Largeur (cm)" onChange={handleChange} className="input" />
          <input name="hauteur" placeholder="Hauteur (cm)" onChange={handleChange} className="input" />
          <input name="temperature" placeholder="Température requise" onChange={handleChange} className="input" />
        </div>

        {type === "distribution" && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input name="zone" placeholder="Arrondissement / Zone" onChange={handleChange} className="input" />
            <input name="hub" placeholder="Hub de livraison" onChange={handleChange} className="input" />
          </div>
        )}
      </section>

      {/* PRIX + ACTION */}
      <div className="bg-gray-100 rounded-xl p-4 shadow text-center">
        <p className="text-lg font-semibold">Volume estimé : {calculVolume()} m³</p>
        {type === "freight" ? (
          <input
            name="prix"
            placeholder="Prix proposé (€)"
            className="input mt-3"
            onChange={handleChange}
          />
        ) : (
          <p className="text-sm mt-2">Prix fixe : <strong>15 €</strong> / colis</p>
        )}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          ✅ Valider et publier la commande
        </button>
      </div>

      <div className="text-center mt-4">
        <QrCodeDisplay value="QR-Commande-123" />
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
}
