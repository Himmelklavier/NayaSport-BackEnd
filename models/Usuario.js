const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  // Propiedades del Usuario
});

module.exports = Usuario;
