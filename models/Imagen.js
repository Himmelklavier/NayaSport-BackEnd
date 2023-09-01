const mysql = require('mysql2/promise');
const dbConnection = require('../config/database'); // Supongo que tienes una conexión a la base de datos establecida en dbConnection.js

const Imagen = {
  defineModel: () => {
    const model = {
      ruta: {
        type: 'STRING',
        allowNull: true
      },
      Producto_idProducto: {
        type: 'INT',
        allowNull: false
      }
    };

    return model;
  },

  findAll: async () => {
    try {
      const [rows] = await dbConnection.execute('SELECT * FROM imagen');
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  findByPk: async (id) => {
    try {
      const [rows] = await dbConnection.execute('SELECT * FROM imagen WHERE idImagen = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  findByProductId: async (Producto_idProducto) => {
    try {
      const [rows] = await dbConnection.execute('SELECT * FROM imagen WHERE Producto_idProducto = ?', [Producto_idProducto]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (ruta, Producto_idProducto) => {
    try {
      const [result] = await dbConnection.execute(
        'INSERT INTO imagen (ruta, Producto_idProducto) VALUES (?, ?)',
        [ruta, Producto_idProducto]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Puedes agregar funciones para actualizar y eliminar imágenes si es necesario
};

module.exports = Imagen;
