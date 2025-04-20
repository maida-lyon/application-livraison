const Commande = require("../models/Commande");

exports.creerCommande = async (req, res) => {
  try {
    console.log("📦 Données reçues :", req.body);

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

      UserId, // Ajouté si la commande vient d’un donneur connecté
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
      UserId: UserId || null, // facultatif
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

// ✅ GET ALL (admin ou affichage général)
exports.getAll = async (req, res) => {
  try {
    const commandes = await Commande.findAll();
    res.json(commandes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur getAll commandes", erreur: err.message });
  }
};

// ✅ GET BY USER
exports.getByUser = async (req, res) => {
  try {
    const commandes = await Commande.findAll({
      where: { UserId: req.params.id },
    });

    res.json(commandes);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur commandes par utilisateur",
        erreur: err.message,
      });
  }
};
