"use client";
import { useState } from "react";
import axios from "axios";

export default function LitigeForm({ commandeId }: { commandeId: number }) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [commentaire, setCommentaire] = useState("");

  const envoyerLitige = async () => {
    if (!photo || !commandeId) return;
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("commentaire", commentaire);
    formData.append("commandeId", String(commandeId));

    await axios.post("http://localhost:5000/api/litige", formData);
    alert("Litige déclaré !");
  };

  return (
    <div className="mt-4 border p-3 space-y-2">
      <h3 className="font-semibold">Déclarer un litige</h3>
      <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
      <textarea
        placeholder="Commentaire"
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        className="border w-full p-2"
      />
      <button onClick={envoyerLitige} className="bg-red-600 text-white px-4 py-2 w-full">
        Envoyer litige
      </button>
    </div>
  );
}
