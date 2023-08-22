// controllers/productosController.js
const Producto = require('../models/Producto');

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
    const {
      referencia,
      precio_int,
      precio_venta,
      imagen,
      dimensiones,
      nombre,
      descripcion,
      estado,
      marca,
      fecha_ingreso
    } = req.body;
    try {
      const producto = await Producto.create({
        referencia,
        precio_int,
        precio_venta,
        imagen,
        dimensiones,
        nombre,
        descripcion,
        estado,
        marca,
        fecha_ingreso
      });
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto.' });
    }
  },
  updateProducto: async (req, res) => {
    const id = req.params.id;
    const {
      referencia,
      precio_int,
      precio_venta,
      imagen,
      dimensiones,
      nombre,
      descripcion,
      estado,
      marca,
      fecha_ingreso
    } = req.body;
    try {
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      await producto.update({
        referencia,
        precio_int,
        precio_venta,
        imagen,
        dimensiones,
        nombre,
        descripcion,
        estado,
        marca,
        fecha_ingreso
      });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
  },
  deleteProducto: async (req, res) => {
    const id = req.params.id;
    try {
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      await producto.destroy();
      res.json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
  }
};

module.exports = productosController;
