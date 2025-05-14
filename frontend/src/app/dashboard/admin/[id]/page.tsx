"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function AdminUserDetail() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    axios
      .get(`${API}/api/users/profile/${id}`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setMessage("❌ Utilisateur introuvable"))
  }, [id])

  const handleAction = async (action: "valider" | "refuser" | "forcer") => {
    try {
      await axios.put(`${API}/api/admin/${action}/${id}`, {}, { withCredentials: true })
      setMessage(`✅ Compte ${action}`)
    } catch {
      setMessage("❌ Erreur action")
    }
  }

  if (!user) return <p className="p-6">Chargement…</p>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black">
      <h1 className="text-xl font-bold mb-4">👤 {user.nom}</h1>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Téléphone :</strong> {user.telephone}</p>
      <p><strong>Rôle :</strong> {user.role}</p>
      <p><strong>Statut :</strong> {user.valide ? "✅ Validé" : user.force ? "🛠️ Forcé" : "⏳ En attente"}</p>

      <h2 className="mt-4 font-semibold">📎 Documents</h2>
      {user.documents && Object.entries(user.documents).map(([key, value]) => (
        <div key={key} className="my-2">
          <span className="capitalize">{key} :</span>{" "}
          {value ? (
            <a href={`/uploads/${value}`} target="_blank" className="text-blue-600 underline">Voir</a>
          ) : (
            <span className="text-gray-400">Non fourni</span>
          )}
        </div>
      ))}

      <div className="mt-6 space-x-2">
        <button onClick={() => handleAction("valider")} className="bg-green-600 text-white px-4 py-2 rounded">✅ Valider</button>
        <button onClick={() => handleAction("refuser")} className="bg-red-600 text-white px-4 py-2 rounded">❌ Refuser</button>
        <button onClick={() => handleAction("forcer")} className="bg-yellow-500 text-white px-4 py-2 rounded">🛠️ Forcer</button>
      </div>

      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  )
}
