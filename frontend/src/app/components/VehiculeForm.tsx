type Vehicule = {
    type: string;
    longueur: string;
    largeur: string;
    hauteur: string;
    volumeMax: string;
    poidsMax: string;
    temperatureMin: string;
    options: string[];
  };
  
  type VehiculeFormProps = {
    vehicule: Vehicule;
    setVehicule: React.Dispatch<React.SetStateAction<Vehicule>>;
  };
  
  export default function VehiculeForm({ vehicule, setVehicule }: VehiculeFormProps) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <input
          placeholder="Type véhicule"
          value={vehicule.type}
          onChange={(e) => setVehicule({ ...vehicule, type: e.target.value })}
          className="input"
        />
        <input
          placeholder="Longueur (cm)"
          value={vehicule.longueur}
          onChange={(e) => setVehicule({ ...vehicule, longueur: e.target.value })}
          className="input"
        />
        <input
          placeholder="Largeur (cm)"
          value={vehicule.largeur}
          onChange={(e) => setVehicule({ ...vehicule, largeur: e.target.value })}
          className="input"
        />
        <input
          placeholder="Hauteur (cm)"
          value={vehicule.hauteur}
          onChange={(e) => setVehicule({ ...vehicule, hauteur: e.target.value })}
          className="input"
        />
        <input
          placeholder="Volume max (m³)"
          value={vehicule.volumeMax}
          onChange={(e) => setVehicule({ ...vehicule, volumeMax: e.target.value })}
          className="input"
        />
        <input
          placeholder="Poids max (kg)"
          value={vehicule.poidsMax}
          onChange={(e) => setVehicule({ ...vehicule, poidsMax: e.target.value })}
          className="input"
        />
        <input
          placeholder="Température min (°C)"
          value={vehicule.temperatureMin}
          onChange={(e) =>
            setVehicule({ ...vehicule, temperatureMin: e.target.value })
          }
          className="input"
        />
      </div>
    );
  }
  