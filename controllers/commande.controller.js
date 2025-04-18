const Commande = require("../models/Commande");

exports.creerCommande = async (req, res) => {
  try {
    console.log("📦 Données reçues :", req.body); // LOG complet

    const {
      type,
      entrepriseChargement,
      telephoneChargement,
      adresseChargement,
      codePostalChargement,
      villeChargement,
      dateChargement,
      horaireChargement,
      instructionsChargement,

      entrepriseLivraison,
      telephoneLivraison,
      adresseLivraison,
      codePostalLivraison,
      villeLivraison,
      dateLivraison,
      horaireLivraison,
      instructionsLivraison,

      typologie,
      quantiteColis,
      poids,
      longueur,
      largeur,
      hauteur,
      temperatureMin,

      prixTotal,
      commission,
      netTransporteur,
    } = req.body;

    // Validation rapide
    if (!adresseChargement || !adresseLivraison || !quantiteColis) {
      return res
        .status(400)
        .json({ message: "Champs obligatoires manquants." });
    }

    const volume = (longueur * largeur * hauteur) / 1000000 || 0;
    const metrageSol = (longueur * largeur) / 10000 || 0;
    const qrCode = `QR-${Date.now()}`;

    const commande = await Commande.create({
      type,
      entrepriseChargement,
      telephoneChargement,
      adresseChargement,
      codePostalChargement,
      villeChargement,
      dateChargement,
      horaireChargement,
      instructionsChargement,

      entrepriseLivraison,
      telephoneLivraison,
      adresseLivraison,
      codePostalLivraison,
      villeLivraison,
      dateLivraison,
      horaireLivraison,
      instructionsLivraison,

      typologie,
      quantiteColis,
      poids,
      longueur,
      largeur,
      hauteur,
      temperatureMin,

      volume,
      metrageSol,
      prixTotal,
      commission,
      netTransporteur,
      statut: "préparée",
      qrCode,
    });

    res.status(201).json({
      id: commande.id,
      qrCode: commande.qrCode,
      prixTotal,
      commission,
      netTransporteur,
    });
  } catch (err) {
    console.error("❌ Erreur création commande :", err);
    res.status(500).json({
      message: "Erreur création commande",
      erreur: err.message,
    });
  }
};
