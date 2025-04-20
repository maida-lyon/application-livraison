
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Adresse = db.define('Adresse', {
rue: DataTypes.STRING,
codePostal: DataTypes.STRING,
ville: DataTypes.STRING,
pays: DataTypes.STRING,
type: DataTypes.STRING,
latitude: DataTypes.STRING,
longitude: DataTypes.STRING
});

module.exports = Adresse;
