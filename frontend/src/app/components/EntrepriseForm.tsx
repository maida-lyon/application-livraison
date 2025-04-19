"use client";
import { useState } from "react";

export default function EntrepriseForm({ userId }: { userId: number }) {
  const [form, setForm] = useState({
    nom: "",
    siret: "",
    adresse: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    alert("Entreprise enregistrée : " + form.nom);
  };

  return (
    <div className="mt-4 space-y-2">
      <input name="nom" placeholder="Nom de l'entreprise" onChange={handleChange} className="w-full p-2 border" />
      <input name="siret" placeholder="SIRET" onChange={handleChange} className="w-full p-2 border" />
      <input name="adresse" placeholder="Adresse" onChange={handleChange} className="w-full p-2 border" />
      <button onClick={handleSubmit} className="bg-blue-600 text-white w-full py-2">Valider entreprise</button>
    </div>
  );
}
