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

  create: async (imagenData) => {
    try {
      const [result] = await dbConnection.execute(
        'INSERT INTO imagen (ruta, Producto_idProducto) VALUES (?, ?)',
        [imagenData.ruta, imagenData.Producto_idProducto]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (idProducto, nuevasRutasDeImagenes) => {
    try {
      // Primero, elimina las rutas de imágenes existentes para el producto
      await Imagen.delete(idProducto);

      // Luego, inserta las nuevas rutas de imágenes
      if (nuevasRutasDeImagenes.length > 0) {
        for (const ruta of nuevasRutasDeImagenes) {
          const imagenData = {
            ruta: ruta,
            Producto_idProducto: idProducto
          };
          await Imagen.create(imagenData);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  delete: async (idProducto) => {
    try {
        const [rows] = await dbConnection.execute('DELETE FROM imagen WHERE Producto_idProducto = ?', [idProducto]);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  
};

module.exports = Imagen;
