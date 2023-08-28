const mysql = require('mysql2/promise');

// Supongamos que tienes una conexión a la base de datos establecida en dbConnection.js
const dbConnection = require('../config/database');

const Producto = require('../models/Producto'); // Reemplaza la ruta según tu estructura de carpetas

const productosController = {
  getAllProductos: async (req, res) => {
    try {
      const productos = await Producto.findAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos.' });
    }
  },

  getProductoById: async (req, res) => {
    const id = req.params.id;
    try {
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto.' });
    }
  },

  createProducto: async (req, res) => {
    const productoData = req.body;
    try {
      const productId = await Producto.create(productoData);
      const producto = { idProducto: productId, ...productoData };
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto.' });
    }
  },

  updateProducto: async (req, res) => {
    const id = req.params.id;
    const productoData = req.body;
    try {
      const updated = await Producto.update(id, productoData);
      if (!updated) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      const producto = { idProducto: id, ...productoData };
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
  },

  deleteProducto: async (req, res) => {
    const id = req.params.id;
    try {
      const deleted = await Producto.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      res.json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
  }
};

module.exports = productosController;
