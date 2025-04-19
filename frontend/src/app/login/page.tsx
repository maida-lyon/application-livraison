"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", motdepasse: "" });
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      console.log("Formulaire envoyé :", form);

      const res = await axios.post(`${API}/api/users/login`, form, {
        withCredentials: true,
      });

      console.log("Réponse backend :", res.data);

      const { role } = res.data;
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      console.error("Erreur login :", err);
      alert(err?.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Se connecter</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-64"
        autoComplete="email"
      />
      <input
        type="password"
        name="motdepasse"
        placeholder="Mot de passe"
        value={form.motdepasse}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-64"
        autoComplete="current-password"
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-2 rounded w-64"
      >
        Connexion
      </button>
    </div>
  );
}
