'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold">Bienvenue sur DeliverApp</h1>
        <p className="text-gray-300 text-sm">
          Freight, Distribution, QR code, Tracking, IA de validation… Tout en un.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/register">
            <button className="w-full bg-white text-black py-3 rounded-xl hover:bg-gray-300 transition">
              Créer un compte
            </button>
          </Link>
          <Link href="/login">
            <button className="w-full border border-white py-3 rounded-xl hover:bg-white hover:text-black transition">
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
