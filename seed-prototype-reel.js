// 🔐 Charger .env EN PREMIER ABSOLUMENT
require("dotenv").config({ path: "./.env" });

// ✅ Maintenant on peut importer Sequelize (qui lit .env dans db.js)
const db = require("./backend/config/db.js");
const User = require("./backend/models/User");
const Vehicule = require("./backend/models/Vehicule");

(async () => {
  try {
    await db.authenticate();
    console.log("✅ PostgreSQL connecté !");
    await db.sync({ force: true });

    // Donneur d’ordre
    const client = await User.create({
      nom: "Donneur Alpha",
      email: "alpha@client.fr",
      telephone: "0611111111",
      adresse: "1 rue de l’Ordre, Lyon",
      role: "donneur",
      statutEnLigne: true,
    });

    // Transporteur
    const transporteur = await User.create({
      nom: "Transporteur Froid",
      email: "frigo@transport.fr",
      telephone: "0622222222",
      adresse: "5 rue du Transport, Lyon",
      role: "transporteur",
      statutEnLigne: true,
    });

    // Véhicule
    const vehicule = await Vehicule.create({
      marque: "Iveco",
      modele: "FroidPro",
      immatriculation: "FR-123-ZFE",
      type: "Fourgon",
      typologieVehicule: "camion frigorifique",
      volumeMax: 15,
      poidsMax: 1500,
      temperatureMin: -18,
      temperatureMax: 5,
      UserId: transporteur.id,
    });

    console.log("\n✅ Donneur créé :", client.email);
    console.log("✅ Transporteur créé :", transporteur.email);
    console.log("✅ Véhicule créé :", vehicle.immatriculation);
    console.log("\n🎉 SEED PROTOTYPE RÉEL TERMINÉ 🎉");
    process.exit(0);
  } catch (error) {
    console.error("❌ ERREUR SEED :", error);
    process.exit(1);
  }
})();
