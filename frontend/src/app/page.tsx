"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">
          Bienvenue sur <span className="text-blue-600">DeliverApp</span>
        </h1>
        <p className="text-gray-600">
          Plateforme intelligente pour vos livraisons : Freight, Distribution, QR code, Tracking, Chatbot...
        </p>
        <div className="space-y-3">
          <Link href="/register">
            <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
              Créer un compte
            </button>
          </Link>
          <Link href="/login">
            <button className="w-full border border-black text-black py-3 rounded-xl hover:bg-gray-100 transition">
              Se connecter
            </button>
          </Link>
        </div>
        <div className="text-sm text-gray-500 mt-4">
          Déjà connecté ? Accès direct :
          <div className="flex justify-center gap-4 mt-1 text-blue-600">
            <Link href="/dashboard/donneur">Donneur</Link>
            <Link href="/dashboard/transporteur">Transporteur</Link>
            <Link href="/dashboard/admin">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
