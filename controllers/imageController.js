const mysql = require('mysql2/promise');

const dbConnection = require('../config/database');

const Imagen = require('../models/Imagen'); 
const imageController = {
     
    getImageById: async (req, res) => {
      const idImagen = req.params.id;
      try {
        const imagen = await Imagen.findByPk(idImagen);
        if (!imagen) {
          return res.status(404).json({ error: 'Imagen no encontrada' });
        }
        res.json(imagen);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener la imagen.' });
      }
    },
  
    getImagesByProductId: async (req, res) => {
      const idProducto = req.params.id;
      try {
        const imagenes = await Imagen.findByProductId(idProducto);
        console.log(imagenes)
        res.json(imagenes);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener las imágenes del producto.' });
      }
    },
  
    createImage: async (req, res) => {
        const idProducto = req.params.id;
        const {
            rutaImg
        } = req.body;
      try {
        const nuevaImagen = {
            ruta: rutaImg,
            Producto_idProducto: idProducto
          };
        const imagenId = await Imagen.create(nuevaImagen);
        res.json({ id: imagenId });
      } catch (error) {
        res.status(500).json({ error: 'Error al crear la imagen.' });
      }
    },
  
    updateImageForProduct: async (req, res) => {
      const idProducto = req.params.id;
        const {
            rutaImg
        } = req.body;
      try {
        const nuevaRuta = {
            ruta: rutaImg,
            Producto_idProducto: idProducto
          };
        await Imagen.updateOne(idProducto, nuevaRuta);
        res.json({ message: 'Imágenes actualizada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar las imágenes del producto.' });
      }
    },
  
    deleteImage: async (req, res) => {
      const idImagen = req.params.id;
      try {
        await Imagen.delete(idImagen);
        res.json({ message: 'Imagen eliminada exitosamente.' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la imagen.' });
      }
    }
}
  
  module.exports = imageController;
  