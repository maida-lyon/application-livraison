"use client";

import { useState } from "react";
import ChatBot from "./ChatBot";

export default function IAButton() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <>
      {/* BOUTON FLOTTANT FIXÉ EN BAS DROITE */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setOuvert(!ouvert)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
        >
          {ouvert ? "Fermer IA" : "💬 IA"}
        </button>
      </div>

      {/* FENÊTRE IA AFFICHÉE SI OUVERT */}
      {ouvert && (
        <div className="fixed bottom-16 right-4 w-80 max-w-full bg-white border rounded-xl shadow-lg z-50">
          <ChatBot />
        </div>
      )}
    </>
  );
}
