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
  const [openIA, setOpenIA] = useState(false);

  const [form, setForm] = useState<any>({
    entrepriseChargement: "",
    telephoneChargement: "",
    adresseChargement: "",
    codePostalChargement: "",
    villeChargement: "",
    dateChargement: "",
    horaireChargement: "",
    instructionsChargement: "",
    nomSignataireChargement: "",
    signatureChargement: "",
    photoChargement: null,
    commentaireChargement: "",

    entrepriseLivraison: "",
    telephoneLivraison: "",
    adresseLivraison: "",
    codePostalLivraison: "",
    villeLivraison: "",
    dateLivraison: "",
    horaireLivraison: "",
    instructionsLivraison: "",
    nomSignataireLivraison: "",
    signatureLivraison: "",
    photoLivraison: null,
    commentaireLivraison: "",

    typologie: "palette",
    quantiteColis: 1,
    poids: "",
    longueur: "",
    largeur: "",
    hauteur: "",
    temperatureMin: "",
    metrageSol: "",
    prixTotal: "",
    commission: "",
    netTransporteur: "",
  });

  const calculVolume = () => {
    const l = parseFloat(form.longueur) || 0;
    const L = parseFloat(form.largeur) || 0;
    const h = parseFloat(form.hauteur) || 0;
    const q = parseInt(form.quantiteColis) || 1;
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
    const data = new FormData();
    const volume = calculVolume();

    Object.entries({ ...form, type, volume }).forEach(([key, value]) => {
      if (value instanceof File) {
        data.append(key, value);
      } else {
        data.append(key, String(value));
      }
    });

    try {
      const res = await axios.post(`${API}/api/commandes`, data, {
        withCredentials: true,
      });
      alert("✅ Commande envoyée");
    } catch (err) {
      alert("❌ Erreur commande");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white text-black rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">Créer une commande</h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setType("freight")}
          className={`px-5 py-2 rounded-full font-semibold ${
            type === "freight" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          FREIGHT
        </button>
        <button
          onClick={() => setType("distribution")}
          className={`px-5 py-2 rounded-full font-semibold ${
            type === "distribution" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          MESSAGERIE
        </button>
      </div>

      {/* Chargement */}
      <section className="bg-gray-50 rounded-xl p-4 shadow">
        <h2 className="font-semibold mb-2">📦 Lieu de chargement</h2>
        <input name="entrepriseChargement" placeholder="Entreprise" onChange={handleChange} className="input mb-2" />
        <input name="telephoneChargement" placeholder="Téléphone" onChange={handleChange} className="input mb-2" />
        <input name="adresseChargement" placeholder="Adresse" onChange={handleChange} className="input mb-2" />
        <input name="codePostalChargement" placeholder="Code postal" onChange={handleChange} className="input mb-2" />
        <input name="villeChargement" placeholder="Ville" onChange={handleChange} className="input mb-2" />
        <input name="dateChargement" type="date" onChange={handleChange} className="input mb-2" />
        <input name="horaireChargement" placeholder="Heure" onChange={handleChange} className="input mb-2" />
        <textarea name="instructionsChargement" placeholder="Instructions" onChange={handleChange} className="input mb-2" />
        <input name="nomSignataireChargement" placeholder="Nom du signataire" onChange={handleChange} className="input mb-2" />
        <UploadProof name="photoChargement" onChange={handleChange} />
        <Commentaire
          value={form.commentaireChargement}
          onChange={(e) => setForm({ ...form, commentaireChargement: e.target.value })}
        />
        <SignaturePad label="Signature du responsable" name="signatureChargement" setForm={setForm} />
      </section>
      {/* Livraison */}
      <section className="bg-gray-50 rounded-xl p-4 shadow mt-6">
        <h2 className="font-semibold mb-2">🚚 Lieu de livraison</h2>
        <input name="entrepriseLivraison" placeholder="Entreprise" onChange={handleChange} className="input mb-2" />
        <input name="telephoneLivraison" placeholder="Téléphone" onChange={handleChange} className="input mb-2" />
        <input name="adresseLivraison" placeholder="Adresse" onChange={handleChange} className="input mb-2" />
        <input name="codePostalLivraison" placeholder="Code postal" onChange={handleChange} className="input mb-2" />
        <input name="villeLivraison" placeholder="Ville" onChange={handleChange} className="input mb-2" />
        <input name="dateLivraison" type="date" onChange={handleChange} className="input mb-2" />
        <input name="horaireLivraison" placeholder="Heure" onChange={handleChange} className="input mb-2" />
        <textarea name="instructionsLivraison" placeholder="Instructions" onChange={handleChange} className="input mb-2" />
        <input name="nomSignataireLivraison" placeholder="Nom du signataire" onChange={handleChange} className="input mb-2" />
        <UploadProof name="photoLivraison" onChange={handleChange} />
        <Commentaire
          value={form.commentaireLivraison}
          onChange={(e) => setForm({ ...form, commentaireLivraison: e.target.value })}
        />
        <SignaturePad label="Signature du réceptionnaire" name="signatureLivraison" setForm={setForm} />
      </section>

      {/* Marchandise */}
      <section className="bg-gray-50 rounded-xl p-4 shadow mt-6">
        <h2 className="font-semibold mb-2">📦 Marchandise</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input name="typologie" placeholder="Typologie" onChange={handleChange} className="input" />
          <input name="quantiteColis" placeholder="Quantité" type="number" onChange={handleChange} className="input" />
          <input name="poids" placeholder="Poids total (kg)" onChange={handleChange} className="input" />
          <input name="longueur" placeholder="Longueur (cm)" onChange={handleChange} className="input" />
          <input name="largeur" placeholder="Largeur (cm)" onChange={handleChange} className="input" />
          <input name="hauteur" placeholder="Hauteur (cm)" onChange={handleChange} className="input" />
          <input name="temperatureMin" placeholder="Température minimale" onChange={handleChange} className="input" />
          <input name="metrageSol" placeholder="Métrage sol (m)" onChange={handleChange} className="input" />
        </div>
      </section>

      {/* Tarifs + validation */}
      <div className="bg-gray-100 rounded-xl p-4 shadow mt-6 text-center">
        <p className="text-lg font-semibold">Volume estimé : {calculVolume()} m³</p>
        {type === "freight" ? (
          <input name="prixTotal" placeholder="Prix proposé (€)" className="input mt-3" onChange={handleChange} />
        ) : (
          <p className="text-sm mt-2">Prix fixe : <strong>15 €</strong> / colis</p>
        )}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800"
        >
          ✅ Publier la commande
        </button>
      </div>

      <div className="text-center mt-6">
        <QrCodeDisplay value="QR-Commande-123" />
      </div>

      {/* IA flottante */}
      <button
        onClick={() => setOpenIA(!openIA)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow"
      >
        🤖
      </button>

      {openIA && (
        <div className="fixed bottom-20 right-4 w-80 max-h-[80vh] overflow-y-auto bg-white border rounded-xl shadow-lg z-50 p-4">
          <ChatBot />
        </div>
      )}
    </div>
  );
}
