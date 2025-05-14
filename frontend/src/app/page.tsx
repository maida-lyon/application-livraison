'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold text-black">
          Bienvenue sur <span className="text-blue-600">DeliverApp</span>
        </h1>
        <p className="text-gray-600 text-sm">
          Freight, Distribution, QR code, Tracking, Chatbot, IA de validation… Tout en un.
        </p>
        <div className="flex flex-col gap-3">
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
        <div className="text-xs text-gray-500 mt-4">
          Accès sécurisé par rôle (admin / donneur / transporteur)
        </div>
      </div>
    </div>
  );
}
