"use client";

import { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const handleSend = () => {
    if (!message.trim()) return;
    const response = simulateAI(message);
    setLog([...log, `👤 ${message}`, `🤖 ${response}`]);
    setMessage("");
  };

  const simulateAI = (input: string) => {
    if (input.includes("commande")) return "Pour créer une commande, allez dans votre dashboard et remplissez le formulaire.";
    if (input.includes("litige")) return "Vous pouvez déclarer un litige avec photo et commentaire.";
    if (input.includes("paiement")) return "Les paiements sont traités après livraison et validation.";
    return "Je suis votre assistante IA, je vous guide sur la plateforme DeliverApp.";
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 w-80 rounded-xl border">
      <h4 className="font-bold mb-2">Assistant IA</h4>
      <div className="h-40 overflow-y-auto mb-2 text-sm space-y-1">
        {log.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-1 rounded w-full text-sm"
        placeholder="Posez une question..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend} className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-sm w-full">Envoyer</button>
    </div>
  );
}
