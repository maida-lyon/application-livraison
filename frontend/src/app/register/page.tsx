"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    motdepasse: "",
    role: "donneur",
  });
  const [erreur, setErreur] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/api/users/register`, form);
      router.push("/login");
    } catch (err: any) {
      setErreur(err?.response?.data?.message || "Erreur d'inscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

        <input name="nom" placeholder="Nom" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input name="telephone" placeholder="Téléphone" onChange={handleChange} className="border p-2 rounded w-full mb-3" />
        <input name="motdepasse" type="password" placeholder="Mot de passe" onChange={handleChange} className="border p-2 rounded w-full mb-3" />

        <select name="role" onChange={handleChange} className="border p-2 rounded w-full mb-3">
          <option value="donneur">Donneur</option>
          <option value="transporteur">Transporteur</option>
          <option value="admin">Admin</option>
        </select>

        {erreur && <p className="text-red-600 text-sm text-center mb-2">{erreur}</p>}

        <button onClick={handleRegister} className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800">
          S'inscrire
        </button>
      </div>
    </div>
  );
}
