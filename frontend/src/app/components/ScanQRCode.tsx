"use client";
import { useState } from "react";

export default function ScanQRCode() {
  const [code, setCode] = useState("");

  const handleScan = () => {
    alert("QR Code scanné : " + code);
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Saisis ou scanne le QR"
        className="w-full border p-2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleScan}
        className="bg-black text-white w-full py-2"
      >
        Valider le scan
      </button>
    </div>
  );
}
