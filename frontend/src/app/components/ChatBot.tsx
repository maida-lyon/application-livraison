"use client"

import { useState } from "react"
import { FiMessageCircle, FiX } from "react-icons/fi"

export default function ChatBotFloating() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [log, setLog] = useState<string[]>([])

  const handleSend = () => {
    if (!message.trim()) return
    const response = simulateAI(message)
    setLog((prev) => [...prev, `👤 ${message}`, `🤖 ${response}`])
    setMessage("")
  }

  const simulateAI = (input: string) => {
    const msg = input.toLowerCase()
    if (msg.includes("commande")) return "📝 Pour créer une commande, allez dans votre tableau de bord."
    if (msg.includes("livraison")) return "🚚 Les livraisons sont confirmées après la signature du réceptionnaire."
    if (msg.includes("litige")) return "⚠️ Vous pouvez déclarer un litige dans le menu dédié."
    if (msg.includes("paiement")) return "💳 Les paiements sont traités automatiquement après livraison."
    if (msg.includes("inscription")) return "🧾 Cliquez sur 'Créer un compte' pour vous inscrire automatiquement."
    return "🤖 Je suis l’assistante IA de DeliverApp, je vous guide selon vos besoins."
  }

  return (
    <>
      {/* BOUTON FLOTTANT */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {open ? <FiX size={20} /> : <FiMessageCircle size={20} />}
      </button>

      {/* CHATBOT PANEL */}
      {open && (
        <div className="fixed bottom-20 right-4 bg-white border shadow-lg rounded-xl p-4 w-80 max-w-full z-40">
          <h4 className="font-bold mb-2 text-sm">🤖 Assistant IA</h4>
          <div className="h-40 overflow-y-auto text-sm mb-2 border p-2 rounded bg-gray-50 space-y-1">
            {log.map((l, i) => (
              <p key={i} className="text-gray-800">{l}</p>
            ))}
          </div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Posez une question..."
            className="border p-2 rounded w-full text-sm mb-1"
          />
          <button
            onClick={handleSend}
            className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </div>
      )}
    </>
  )
}
