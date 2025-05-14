"use client"
import { useEffect, useState } from "react"
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [message, setMessage] = useState("")

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/comptes`, {
        withCredentials: true,
      })
      setUsers(res.data)
    } catch (err) {
      console.error("Erreur chargement comptes :", err)
      setUsers([])
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const action = async (id: number, type: "valider" | "refuser" | "forcer") => {
    try {
      await axios.put(`${API}/api/admin/${type}/${id}`, {}, { withCredentials: true })
      setMessage(`✅ Utilisateur ${type}`)
      fetchUsers()
    } catch {
      setMessage("❌ Erreur action admin")
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-2xl font-bold text-center mb-6">🧑‍💼 Administration des comptes</h1>

      {message && <p className="text-center text-sm text-blue-600 mb-4">{message}</p>}

      {users.length === 0 ? (
        <p className="text-sm text-center text-gray-500">Aucun compte à valider</p>
      ) : (
        <ul className="space-y-4">
          {users.map((u) => (
            <li key={u.id} className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row justify-between gap-4 items-center">
              <div className="text-sm">
                <p className="font-semibold">{u.nom}</p>
                <p>{u.email}</p>
                <StatutBadge valide={u.valide} force={u.force} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => action(u.id, "valider")} className="bg-green-600 text-white px-3 py-1 rounded text-sm">✅ Valider</button>
                <button onClick={() => action(u.id, "refuser")} className="bg-red-600 text-white px-3 py-1 rounded text-sm">❌ Refuser</button>
                <button onClick={() => action(u.id, "forcer")} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">🛠️ Forcer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StatutBadge({ valide, force }: { valide: boolean; force: boolean }) {
  if (valide)
    return <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs">✅ Validé</span>
  if (force)
    return <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs">🛠️ Forcé</span>
  return <span className="text-red-700 bg-red-100 px-2 py-1 rounded text-xs">⏳ En attente</span>
}
