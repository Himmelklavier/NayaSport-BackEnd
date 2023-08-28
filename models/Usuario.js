const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('usuario', {
  idusuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING, // You specified varchar(45), so use STRING here
    allowNull: true // Change this to false if it's supposed to be not nullable
  },
  Rol_idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Rol', // Replace 'Rol' with the actual table name of roles
      key: 'id' // Replace 'id' with the actual primary key of the referenced table
    }
  }
}, {
  timestamps: false
});



module.exports = Usuario;
