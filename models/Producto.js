// models/Producto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  referencia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  precio_int: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  precio_venta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dimensiones: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Producto;
