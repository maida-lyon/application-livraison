"use client";
import { useState } from "react";

export default function IAValidation() {
  const [kbisDate, setKbisDate] = useState("");
  const [iban, setIban] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [docName, setDocName] = useState("");
  const [result, setResult] = useState("");

  const verifier = () => {
    const validKbis = new Date().getFullYear() - new Date(kbisDate).getFullYear() < 1;
    const validIban = iban.startsWith("FR") && iban.length >= 15;
    const validNom = docName.toLowerCase().includes(entreprise.toLowerCase());

    if (validKbis && validIban && validNom) {
      setResult("✅ Tous les critères sont conformes.");
    } else {
      setResult("❌ Vérification échouée : KBIS, IBAN ou nom incohérent.");
    }
  };

  return (
    <div className="space-y-2">
      <input className="input" type="date" placeholder="Date du KBIS" onChange={(e) => setKbisDate(e.target.value)} />
      <input className="input" type="text" placeholder="IBAN" onChange={(e) => setIban(e.target.value)} />
      <input className="input" type="text" placeholder="Nom entreprise" onChange={(e) => setEntreprise(e.target.value)} />
      <input className="input" type="text" placeholder="Nom du fichier" onChange={(e) => setDocName(e.target.value)} />
      <button onClick={verifier} className="bg-black text-white px-4 py-2 rounded">Lancer vérification IA</button>
      <p className="mt-2 text-sm">{result}</p>
    </div>
  );
}
