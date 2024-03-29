const mysql = require('mysql2/promise');

const dbConnection = require('../config/database');

const Producto = require('../models/Producto');
const Imagen = require('../models/Imagen');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function isImagePathValid(pathImage) {
  return pathImage && pathImage.trim() !== '';
}
function bufferToBase64(buffer) {
  return Buffer.from(buffer).toString('base64');
}

const productosController = {
  getAllProductos: async (req, res) => {
    try {
      const productos = await Producto.findAll();
      res.json(productos[0]);
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

    console.log("body product", req.body)
    const fecha_actual = new Date();

    const {
      referencia,
      precio_int,
      precio_venta,
      dimensiones,
      nombre,
      descripcion,
      marca,
      Categoria_idCategoria,
    } = req.body;
    try {
      let imagenBase64 = null;
      if (req.file && req.file.buffer) {
        // Si hay un archivo adjunto en la solicitud, conviértelo a base64
        imagenBase64 = bufferToBase64(req.file.buffer);
      }

      const productoData = {
        referencia,
        precio_int,
        precio_venta,
        imagen: imagenBase64,
        dimensiones,
        nombre,
        descripcion,
        estado: '0',
        marca,
        fecha_ingreso: `${fecha_actual.toISOString().slice(0, 10)}`,
        StockTallaje_idStockTallaje: null,
        Categoria_idCategoria,
      };


      let productId;
      try {
        productId = await Producto.create(productoData);
      } catch (duplicateEntryError) {
        if (duplicateEntryError.code === 'ER_DUP_ENTRY') {
          // Manejo del error de duplicación de entrada (referencia duplicada)
          return res.status(400).json({ error: 'El producto ya existe en la base de datos.' });
        }
        throw duplicateEntryError; // Re-lanza el error si no es de duplicación de entrada
      }

      const producto = { idProducto: productId, ...productoData };
      res.status(201).json(producto);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el producto y las imagenes.' });
    }
  },

  updateProducto: async (req, res) => {
    const id = req.params.id;
    console.log(req.body, id)
    const fecha_actual = new Date();


    const {
      referencia,
      precio_int,
      precio_venta,
      dimensiones,
      nombre,
      descripcion,
      marca,
      Categoria_idCategoria,
      imagen
    } = req.body;
    try {
      const productoData = {
        referencia,
        precio_int,
        precio_venta,
        dimensiones,
        nombre,
        descripcion,
        estado: 'TRUE',
        marca,
        imagen,
        fecha_ingreso: `${fecha_actual.toISOString().slice(0, 10)}`,
        StockTallaje_idStockTallaje: null,
        Categoria_idCategoria,
      };
      const updatedProduct = await Producto.update(id, productoData);

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }

      res.json({ message: 'Producto actualizado correctamente.' });
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
      console.error(error)
      res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
  },

};

module.exports = productosController;
