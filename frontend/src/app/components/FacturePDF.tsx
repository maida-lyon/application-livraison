"use client";
import jsPDF from "jspdf";

export default function FactureButton({ commande }: { commande: any }) {
  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text(`Facture - Commande #${commande.id}`, 10, 10);
    pdf.text(`Poids : ${commande.poids} kg`, 10, 20);
    pdf.text(`Volume : ${commande.volume} m3`, 10, 30);
    pdf.text(`Départ : ${commande.adresseDepart}`, 10, 40);
    pdf.text(`Arrivée : ${commande.adresseArrivee}`, 10, 50);
    pdf.save(`facture_commande_${commande.id}.pdf`);
  };

  return (
    <button onClick={generatePDF} className="bg-green-600 text-white px-4 py-2 mt-2 w-full">
      Télécharger la facture PDF
    </button>
  );
}
