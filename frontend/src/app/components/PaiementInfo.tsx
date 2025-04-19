"use client";

export default function PaiementInfo({ prixTotal, commission = 20 }: { prixTotal: number; commission?: number }) {
  const frais = (prixTotal * commission) / 100;
  const net = prixTotal - frais;

  return (
    <div className="border p-3 text-sm">
      <p>Total : {prixTotal} €</p>
      <p>Commission ({commission}%) : {frais.toFixed(2)} €</p>
      <p>Net Transporteur : {net.toFixed(2)} €</p>
    </div>
  );
}
