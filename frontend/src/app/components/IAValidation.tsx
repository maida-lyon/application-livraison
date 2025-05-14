"use client"
import { useState } from "react"

export default function IAValidation() {
  const [kbisDate, setKbisDate] = useState("")
  const [iban, setIban] = useState("")
  const [entreprise, setEntreprise] = useState("")
  const [docName, setDocName] = useState("")
  const [result, setResult] = useState("")

  const verifier = () => {
    const validKbis =
      new Date().getFullYear() - new Date(kbisDate).getFullYear() < 1
    const validIban = iban.startsWith("FR") && iban.length >= 15
    const validNom = docName.toLowerCase().includes(entreprise.toLowerCase())

    if (validKbis && validIban && validNom) {
      setResult("✅ Tous les critères sont conformes.")
    } else {
      setResult(
        "❌ Vérification échouée : KBIS > 1 an, IBAN incorrect ou nom incohérent."
      )
    }
  }

  return (
    <div className="space-y-2 bg-white p-4 rounded shadow">
      <h3 className="text-md font-semibold mb-2">Validation IA des documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          className="input"
          type="date"
          placeholder="Date du KBIS"
          onChange={(e) => setKbisDate(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="IBAN"
          onChange={(e) => setIban(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Nom entreprise"
          onChange={(e) => setEntreprise(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Nom du fichier (ex: document-kbis-entreprise.pdf)"
          onChange={(e) => setDocName(e.target.value)}
        />
      </div>
      <button
        onClick={verifier}
        className="mt-2 bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
      >
        🤖 Lancer la vérification IA
      </button>
      <p className="mt-2 text-sm font-medium">{result}</p>
    </div>
  )
}
