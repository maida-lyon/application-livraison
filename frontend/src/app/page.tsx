"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", motdepasse: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/users/login`, form, {
        withCredentials: true,
      });

      const { role } = res.data;
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Connexion</h1>
      <div className="w-full max-w-sm space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />
        <input
          name="motdepasse"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />
        {message && <p className="text-red-600 text-sm">{message}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
