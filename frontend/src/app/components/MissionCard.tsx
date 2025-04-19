type Mission = {
    id: number;
    type: "freight" | "distribution";
    adresseChargement: string;
    adresseLivraison: string;
    typologie: string;
    volume: number;
    poids: number;
    temperature: string;
    statut: string;
  };
  
  type MissionCardProps = {
    mission: Mission;
  };
  
  export default function MissionCard({ mission }: MissionCardProps) {
    return (
      <div className="border p-4 rounded-xl shadow text-sm bg-white">
        <p><strong>📦 Type :</strong> {mission.type}</p>
        <p><strong>📍 Chargement :</strong> {mission.adresseChargement}</p>
        <p><strong>🎯 Livraison :</strong> {mission.adresseLivraison}</p>
        <p><strong>Typologie :</strong> {mission.typologie}</p>
        <p><strong>Volume :</strong> {mission.volume} m³</p>
        <p><strong>Poids :</strong> {mission.poids} kg</p>
        <p><strong>Température :</strong> {mission.temperature}</p>
        <p><strong>Statut :</strong> {mission.statut}</p>
      </div>
    );
  }
  