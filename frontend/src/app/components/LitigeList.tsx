"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LitigeList() {
  const [litiges, setLitiges] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/litiges").then((res) => setLitiges(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {litiges.map((l) => (
        <div key={l.id} className="p-4 bg-white border rounded shadow">
          <p className="font-semibold">Commande #{l.commandeId}</p>
          <p className="text-sm">Motif : {l.commentaire}</p>
          <img src={l.photoUrl} alt="Preuve litige" className="w-full h-40 object-contain mt-2 rounded" />
        </div>
      ))}
    </div>
  );
}
