export const metadata = {
  title: "DeliverApp",
  description: "Plateforme intelligente de livraison",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
