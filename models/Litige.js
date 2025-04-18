
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Litige = db.define('Litige', {
statut: DataTypes.ENUM('ouvert', 'en cours', 'résolu'),
raison: DataTypes.STRING,
description: DataTypes.TEXT
});

module.exports = Litige;
