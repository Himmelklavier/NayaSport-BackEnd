const mysql = require('mysql2/promise');
const fs = require('fs');

const dbConnection = require('../config/database');

const Producto = {
  defineModel: () => {
    const model = {
      referencia: {
        type: 'STRING',
        allowNull: true
      },
      precio_int: {
        type: 'DECIMAL(10, 2)',
        allowNull: true
      },
      precio_venta: {
        type: 'DECIMAL(10, 2)',
        allowNull: true
      },
      imagen: {
        type: 'LONGTEXT',
        allowNull: true
      },
      dimensiones: {
        type: 'STRING',
        allowNull: true
      },
      nombre: {
        type: 'STRING',
        allowNull: true
      },
      descripcion: {
        type: 'TEXT',
        allowNull: true
      },
      estado: {
        type: 'BOOLEAN',
        defaultValue: true
      },
      marca: {
        type: 'STRING',
        allowNull: true
      },
      fecha_ingreso: {
        type: 'DATE',
        allowNull: true
      },
      StockTallaje_idStockTallaje: {
        type: 'INT',
        allowNull: false,
      },
      Categoria_idCategoria: {
        type: 'INT',
        allowNull: false,
      }
    };

    return model;
  },

  findAll: async () => {
    try {
      producto = await dbConnection.execute('SELECT * FROM producto');

      return producto; // Devolvemos la lista de productos con imágenes adjuntas.
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  findByPk: async (id) => {
    try {
      const [rows] = await dbConnection.execute(`
        SELECT producto.referencia, producto.precio_int, producto.precio_venta, producto.imagen, producto.dimensiones,
               producto.nombre, producto.descripcion, producto.estado, producto.marca, producto.fecha_ingreso,
               GROUP_CONCAT(imagen.ruta) AS rutas_imagenes
        FROM producto
        LEFT JOIN imagen ON producto.idProducto = imagen.Producto_idProducto
        WHERE producto.idProducto = ?
        GROUP BY producto.idProducto;
      `, [id]);
  
      if (rows.length === 0) {
        return null; // Si no se encuentra el producto, retornar null
      }
  
      const { rutas_imagenes, ...productData } = rows[0];
  
      // Crear un objeto con las rutas de imágenes como un array
      const imagenes = rutas_imagenes ? rutas_imagenes.split(',') : [];
  
      // Agregar las rutas de imágenes al objeto de datos del producto
      productData.imagenes = imagenes;
  
      return productData;
    } catch (error) {
      throw error;
    }
  },

  create: async (productoData) => {
    try {
      
      const [result] = await dbConnection.execute(
        'INSERT INTO producto (referencia, precio_int, precio_venta, imagen, dimensiones, nombre, descripcion, estado, marca, fecha_ingreso, StockTallaje_idStockTallaje, Categoria_idCategoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          productoData.referencia,
          productoData.precio_int,
          productoData.precio_venta,
          productoData.imagen,
          productoData.dimensiones,
          productoData.nombre,
          productoData.descripcion,
          productoData.estado,
          productoData.marca,
          productoData.fecha_ingreso,
          productoData.StockTallaje_idStockTallaje,
          productoData.Categoria_idCategoria
        ]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  update: async (id, productoData) => {
    try {
      const [result] = await dbConnection.execute(
        'UPDATE producto SET referencia = ?, precio_int = ?, precio_venta = ?, imagen = ?, dimensiones = ?, nombre = ?, descripcion = ?, estado = ?, marca = ?, fecha_ingreso = ? , StockTallaje_idStockTallaje = ? , Categoria_idCategoria = ? WHERE idProducto = ?',
        [
          productoData.referencia,
          productoData.precio_int,
          productoData.precio_venta,
          productoData.imagen,
          productoData.dimensiones,
          productoData.nombre,
          productoData.descripcion,
          productoData.estado,
          productoData.marca,
          productoData.fecha_ingreso,
          productoData.StockTallaje_idStockTallaje,
          productoData.Categoria_idCategoria,
          id
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const [result] = await dbConnection.execute('DELETE FROM producto WHERE idProducto = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = Producto;
