const mysql = require('mysql2/promise');

// Supongamos que tienes una conexión a la base de datos establecida en dbConnection.js
const dbConnection = require('../config/database');

const Producto = require('../models/Producto'); // Reemplaza la ruta según tu estructura de carpetas
function isImagePathValid(path) {
  return path && path.trim() !== '';
}

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
    const fecha_actual = new Date();
    
    const {
      referencia,
      precio_int,
      precio_venta,
      imagen,
      dimensiones,
      nombre,
      descripcion,
      marca,
      Categoria_idCategoria,
      rutaImg2,
      rutaImg3,
      rutaImg4
    } = req.body;
    try {    
  
      const productoData = {
        referencia,
        precio_int,
        precio_venta,
        imagen,
        dimensiones,
        nombre,
        descripcion,
        estado: true,
        marca,
        fecha_ingreso:fecha_actual.toISOString().slice(0, 10),
        StockTallaje_idStockTallaje: NULL,
        Categoria_idCategoria,
      };
      
  
  
      const productId = await Producto.create(productoData);
      const producto = { idProducto: productId, ...productoData };
      //res.status(201).json(producto);
      
      const createdImages = [];

      // Verifica si las rutas de imagen son válidas y las crea
      if (isImagePathValid(rutaImg2)) {
        const imagenData2 = {
          ruta: rutaImg2,
          Producto_idProducto: productId
        };
        const imagenId2 = await Imagen.create(imagenData2);
        createdImages.push({ idImagen: imagenId2, ...imagenData2 });
      }
  
      if (isImagePathValid(rutaImg3)) {
        const imagenData3 = {
          ruta: rutaImg3,
          Producto_idProducto: productId
        };
        const imagenId3 = await Imagen.create(imagenData3);
        createdImages.push({ idImagen: imagenId3, ...imagenData3 });
      }
  
      if (isImagePathValid(rutaImg4)) {
        const imagenData4 = {
          ruta: rutaImg4,
          Producto_idProducto: productId
        };
        const imagenId4 = await Imagen.create(imagenData4);
        createdImages.push({ idImagen: imagenId4, ...imagenData4 });
      }
  
      res.status(201).json({ producto, imagenes: createdImages });
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
  },
  
};

module.exports = productosController;
