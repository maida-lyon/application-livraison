"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RibList() {
  const [ribs, setRibs] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/ribs").then((res) => setRibs(res.data));
  }, []);

  const valider = (id: number) => {
    axios.patch(`/api/ribs/${id}`, { statut: "validé" }).then(() => {
      setRibs((prev) =>
        prev.map((rib) => (rib.id === id ? { ...rib, statut: "validé" } : rib))
      );
    });
  };

  return (
    <div className="space-y-4">
      {ribs.map((rib) => (
        <div key={rib.id} className="p-4 border rounded bg-white shadow">
          <p className="font-semibold">{rib.nom} - {rib.iban}</p>
          <p className="text-sm">Statut : {rib.statut}</p>
          <button onClick={() => valider(rib.id)} className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
            Valider
          </button>
        </div>
      ))}
    </div>
  );
}
