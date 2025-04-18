const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Commande = db.define("Commande", {
  type: {
    type: DataTypes.ENUM("freight", "distribution"),
    allowNull: false,
  },

  // Chargement
  entrepriseChargement: DataTypes.STRING,
  telephoneChargement: DataTypes.STRING,
  adresseChargement: { type: DataTypes.STRING, allowNull: false },
  codePostalChargement: DataTypes.STRING,
  villeChargement: DataTypes.STRING,
  dateChargement: DataTypes.STRING,
  horaireChargement: DataTypes.STRING,
  instructionsChargement: DataTypes.STRING,

  // Livraison
  entrepriseLivraison: DataTypes.STRING,
  telephoneLivraison: DataTypes.STRING,
  adresseLivraison: { type: DataTypes.STRING, allowNull: false },
  codePostalLivraison: DataTypes.STRING,
  villeLivraison: DataTypes.STRING,
  dateLivraison: DataTypes.STRING,
  horaireLivraison: DataTypes.STRING,
  instructionsLivraison: DataTypes.STRING,

  // Marchandise
  typologie: DataTypes.STRING,
  quantiteColis: { type: DataTypes.INTEGER, allowNull: false },
  poids: DataTypes.FLOAT,
  longueur: DataTypes.FLOAT,
  largeur: DataTypes.FLOAT,
  hauteur: DataTypes.FLOAT,
  volume: DataTypes.FLOAT,
  metrageSol: DataTypes.FLOAT,
  temperatureMin: DataTypes.FLOAT,

  // Tarifs
  prixTotal: DataTypes.FLOAT,
  commission: DataTypes.FLOAT,
  netTransporteur: DataTypes.FLOAT,

  statut: {
    type: DataTypes.STRING,
    defaultValue: "préparée",
  },
});

module.exports = Commande;
