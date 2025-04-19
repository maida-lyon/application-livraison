"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DocumentList() {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/documents").then((res) => setDocuments(res.data));
  }, []);

  const handleStatus = (id: number, statut: string) => {
    axios.patch(`/api/documents/${id}`, { statut }).then(() => {
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === id ? { ...doc, statut } : doc))
      );
    });
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="p-4 border rounded-lg shadow bg-white">
          <p className="font-semibold">{doc.type} - {doc.nom}</p>
          <p className="text-sm text-gray-500">Statut : {doc.statut}</p>
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Voir le document
          </a>
          <div className="flex gap-2 mt-2">
            <button onClick={() => handleStatus(doc.id, "validé")} className="px-3 py-1 bg-green-600 text-white rounded">Valider</button>
            <button onClick={() => handleStatus(doc.id, "refusé")} className="px-3 py-1 bg-red-600 text-white rounded">Refuser</button>
          </div>
        </div>
      ))}
    </div>
  );
}
