const db = require("./backend/config/db");
const User = require("./backend/models/User");
const Vehicule = require("./backend/models/Vehicule");
const Commande = require("./backend/models/Commande");

require("dotenv").config();

(async () => {
  try {
    await db.sync({ force: true });

    console.log("🔁 Base réinitialisée");

    // 1. Donneur d’ordre
    const donneur = await User.create({
      nom: "Client Messagerie",
      email: "client@hub.fr",
      telephone: "0600000000",
      adresse: "Lyon 1",
      role: "donneur",
      statutEnLigne: true,
    });

    // 2. Ramasseur ZFE
    const ramasseur = await User.create({
      nom: "Ramasseur ZFE",
      email: "ramasseur@hub.fr",
      telephone: "0611111111",
      adresse: "Base ZFE",
      role: "transporteur",
      statutEnLigne: true,
    });

    await Vehicule.create({
      marque: "Renault",
      modele: "ZFE Master",
      immatriculation: "ZFE-001",
      type: "Fourgon",
      typologieVehicule: "ramassage",
      volumeMax: 30,
      poidsMax: 2000,
      UserId: ramasseur.id,
    });

    // 3. Livreur Quartier
    const livreur = await User.create({
      nom: "Livreur Quartier",
      email: "livreur@hub.fr",
      telephone: "0622222222",
      adresse: "Lyon 7",
      role: "transporteur",
      statutEnLigne: true,
    });

    await Vehicule.create({
      marque: "UrbanBike",
      modele: "Cargo",
      immatriculation: "BIKE-001",
      type: "Vélo",
      typologieVehicule: "dernier-kilomètre",
      volumeMax: 5,
      poidsMax: 50,
      UserId: livreur.id,
    });

    // 4. Commande distribution
    const commande = await Commande.create({
      type: "distribution",
      zone: "Zone 2",
      nbColis: 1,
      poidsTotal: 8,
      donneurId: donneur.id,
      hub: "HUB Lyon 7",
      dateSouhaitee: "2025-04-14",
    });

    // 5. Matching (simulation)
    const match = {
      commandeId: commande.id,
      prixTotalFacture: 15,
      ramasseur: {
        id: ramasseur.id,
        nom: ramasseur.nom,
        remuneration: 0.5,
      },
      livreurFinal: {
        id: livreur.id,
        nom: livreur.nom,
        remuneration: 1.5,
      },
      commissionPlateforme: 13,
      qrCode: `QR-${commande.id}`,
      facturePdf: `facture-commande-${commande.id}.pdf`,
      tracking: {
        statut: "préparée",
        position: null,
      },
    };

    console.log("✅ DISTRIBUTION SETUP TERMINÉ ✅\n");
    console.log(JSON.stringify(match, null, 2));
    process.exit();
  } catch (err) {
    console.error("❌ ERREUR setup distribution :", err);
    process.exit(1);
  }
})();
