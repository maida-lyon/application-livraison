import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "DeliverApp",
  description: "Livraisons Freight & Distribution",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
