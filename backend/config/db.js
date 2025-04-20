require("dotenv").config();
const { Sequelize } = require("sequelize");

if (!process.env.DB_DIALECT) {
  throw new Error("❌ DB_DIALECT manquant dans .env");
}

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = db;
