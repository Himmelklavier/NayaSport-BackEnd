const mysql = require('mysql2/promise');

// Supongamos que tienes una conexión a la base de datos establecida en dbConnection.js
const dbConnection = require('../config/database');

const Usuario = {
  defineModel: () => {
    const model = {
      idUsuario: {
        type: 'INT',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: 'STRING',
        allowNull: false,
        unique: true
      },
      password: {
        type: 'STRING',
        allowNull: false
      },
      estado: {
        type: 'STRING', // You specified varchar(45), so use STRING here
        allowNull: true, // Change this to false if it's supposed to be not nullable
        defaultValue: 'activo'
      },
      Rol_idRol: {
        type: 'INT',
        allowNull: false,
        defaultValue: 2, // Default value for Rol_idRol
       
      }
    };

    return model;
  },

  create: async (usuarioData) => {
    try {
      
      const [result] = await dbConnection.execute(
        'INSERT INTO usuario (email, password, estado, Rol_idRol) VALUES (?, ?, ?, ?)',
        [usuarioData.email, usuarioData.password, usuarioData.estado, usuarioData.Rol_idRol]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const [rows] = await dbConnection.execute('SELECT * FROM usuario WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Usuario;
