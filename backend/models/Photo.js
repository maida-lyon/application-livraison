
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Photo = db.define('Photo', {
url: DataTypes.STRING,
description: DataTypes.STRING
});

module.exports = Photo;
