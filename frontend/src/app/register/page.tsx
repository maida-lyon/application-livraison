"use client";
import { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    motdepasse: "",
    role: "donneur",
    kbis: null,
    assurance: null,
    identite: null,
    rib: null,
    justificatif: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await axios.post(`${API}/api/users/register`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Inscription envoyée. En attente de validation.");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "❌ Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white text-black flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Inscription professionnelle</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        <input name="nom" placeholder="Nom complet" onChange={handleChange} className="input" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" />
        <input name="telephone" placeholder="Téléphone" onChange={handleChange} className="input" />
        <input name="motdepasse" type="password" placeholder="Mot de passe" onChange={handleChange} className="input" />
        <select name="role" onChange={handleChange} className="input">
          <option value="donneur">Donneur d'ordre</option>
          <option value="transporteur">Transporteur</option>
        </select>
      </div>

      <div className="w-full max-w-xl mt-6 space-y-2">
        <label>📎 KBIS :</label>
        <input type="file" name="kbis" onChange={handleChange} className="input" />
        <label>📎 Assurance :</label>
        <input type="file" name="assurance" onChange={handleChange} className="input" />
        <label>📎 Pièce d'identité :</label>
        <input type="file" name="identite" onChange={handleChange} className="input" />
        <label>📎 RIB :</label>
        <input type="file" name="rib" onChange={handleChange} className="input" />
        <label>📎 Justificatif de domicile :</label>
        <input type="file" name="justificatif" onChange={handleChange} className="input" />
      </div>

      {message && <p className="text-center text-red-500 mt-4">{message}</p>}

      <button
        onClick={handleRegister}
        className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        S'inscrire
      </button>
    </div>
  );
}
