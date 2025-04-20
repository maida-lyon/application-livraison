const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("User", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("donneur", "transporteur", "admin"),
    allowNull: false,
  },
});

// Association avec Vehicule
User.hasMany(require("./Vehicule"), {
  foreignKey: "UserId",
  onDelete: "CASCADE",
});

module.exports = User;
