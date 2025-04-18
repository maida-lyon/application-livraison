const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("User", {
  nom: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  telephone: DataTypes.STRING,
  motdepasse: DataTypes.STRING,
  adresse: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM(
      "admin",
      "donneur",
      "transporteur",
      "manutentionnaire"
    ),
    allowNull: false,
  },
  statutEnLigne: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
