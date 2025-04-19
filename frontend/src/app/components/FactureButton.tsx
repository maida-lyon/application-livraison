'use client';

import jsPDF from 'jspdf';

export default function FactureButton({ commande }: { commande: any }) {
  const genererFacture = () => {
    const doc = new jsPDF();
    doc.text('Facture - Livraison', 20, 20);
    doc.text(`Commande ID : ${commande.id}`, 20, 30);
    doc.text(`Poids : ${commande.poids} kg`, 20, 40);
    doc.text(`Volume : ${commande.volume} m³`, 20, 50);
    doc.text(`Prix total : ${commande.match?.prixTotal ?? ''} €`, 20, 60);
    doc.text(`Commission : ${commande.match?.commission ?? ''} €`, 20, 70);
    doc.text(`Net transporteur : ${commande.match?.netTransporteur ?? ''} €`, 20, 80);
    doc.save(`facture-${commande.id}.pdf`);
  };

  return (
    <button onClick={genererFacture} className="bg-green-700 text-white py-2 px-4 mt-2 rounded hover:bg-green-800">
      Télécharger la facture
    </button>
  );
}
