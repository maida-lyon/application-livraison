"use client";
import { useState } from "react";

export default function DocumentUpload({ userId }: { userId: number }) {
  const [type, setType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!type || !file) return;
    alert("Document envoyé : " + file.name + " [" + type + "]");
  };

  return (
    <div className="space-y-2 mt-4">
      <select className="w-full border p-2" onChange={(e) => setType(e.target.value)}>
        <option value="">-- Type de document --</option>
        <option value="kbis">KBIS</option>
        <option value="pièce">Pièce d'identité</option>
        <option value="assurance">Assurance</option>
        <option value="autre">Autre</option>
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleSubmit} className="bg-black text-white w-full py-2">Envoyer</button>
    </div>
  );
}
