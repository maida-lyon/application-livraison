require("dotenv").config(); // ✅ charger .env ici

const { Sequelize } = require("sequelize");

if (!process.env.DB_DIALECT) {
  throw new Error("❌ Erreur : DB_DIALECT manquant dans .env");
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

module.exports = sequelize;
