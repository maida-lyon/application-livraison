"use client";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-black text-white p-3 flex justify-around text-sm fixed top-0 w-full z-50">
      <Link href="/dashboard/donneur">Donneur</Link>
      <Link href="/dashboard/transporteur">Transporteur</Link>
      <Link href="/dashboard/admin">Admin</Link>
      <Link href="/login">Déconnexion</Link>
    </div>
  );
}
