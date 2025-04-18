const { DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./User"); // Association nécessaire

const Vehicule = db.define("Vehicule", {
  marque: DataTypes.STRING,
  modele: DataTypes.STRING,
  immatriculation: DataTypes.STRING,
  type: DataTypes.STRING,
  typologieVehicule: DataTypes.STRING,
  volumeMax: DataTypes.FLOAT,
  poidsMax: DataTypes.FLOAT,
  temperatureMin: DataTypes.FLOAT,
  temperatureMax: DataTypes.FLOAT,
});

// Association vers User
Vehicule.belongsTo(User);

module.exports = Vehicule;
