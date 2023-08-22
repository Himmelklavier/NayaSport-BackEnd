const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  // Propiedades del Producto
});

module.exports = Producto;
