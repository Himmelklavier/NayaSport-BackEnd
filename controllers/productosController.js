const mysql = require('mysql2/promise');

// Supongamos que tienes una conexión a la base de datos establecida en dbConnection.js
const dbConnection = require('../config/database');

const Producto = require('../models/Producto');
const Imagen = require('../models/Imagen'); 
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function isImagePathValid(pathImage) {
  return pathImage && pathImage.trim() !== '';
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

    console.log(req.body)
    const fecha_actual = new Date();
    const imagen = req.file.buffer;

    const {
      referencia,
      precio_int,
      precio_venta,
      dimensiones,
      nombre,
      descripcion,
      marca,
      Categoria_idCategoria,
      /*rutaImg2,
      rutaImg3,
      rutaImg4*/
    } = req.body;
    try {    
  
      const productoData = {
        referencia,
        precio_int,
        precio_venta,
        imagen: imagen,
        dimensiones,
        nombre,
        descripcion,
        estado: 'TRUE',
        marca,
        fecha_ingreso:`${fecha_actual.toISOString().slice(0, 10)}`,
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
      
      /*const createdImages = [];

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
      }*/
  
      res.status(201).json({ producto, imagenes: createdImages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el producto y las imagenes.'});
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
      /*rutaImg2,
      rutaImg3,
      rutaImg4*/
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
        estado:'TRUE',
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

    // Verifica si se proporcionaron nuevas rutas de imágenes
    /*if (
      productoData.rutaImg2 ||
      productoData.rutaImg3 ||
      productoData.rutaImg4
    ) {
      // Construye un array con las rutas de imágenes proporcionadas
      const nuevasRutasDeImagenes = [
        productoData.rutaImg2,
        productoData.rutaImg3,
        productoData.rutaImg4
      ].filter(Boolean); // Filtra las rutas que no son nulas o indefinidas

      // Actualiza las rutas de las imágenes en la tabla imagen
      if (nuevasRutasDeImagenes.length > 0) {
        await Imagen.update(id, nuevasRutasDeImagenes); // Supongamos que tienes una función "updateRutas" en el modelo de Imagen
      }
    }*/

    res.json({ message: 'Producto actualizado correctamente.' });
  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
  },

  deleteProducto: async (req, res) => {
    const id = req.params.id;
    try {
      //primero borro las imagenes relacionadas a el producto
      await Imagen.delete(id); 
      //luego borro el producto como tal
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
