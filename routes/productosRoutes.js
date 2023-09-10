const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require ('path')
const productosController = require('../controllers/productosController');

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname,"../images"),
    filename:(req,file,cb)=>{
      cb(null, Date.now() + '-nayaSport-' + file.originalname)
    }
  })
  const fileUpload = multer ({
    storage: diskstorage
  }).single('image')

router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);
router.post('/', fileUpload, productosController.createProducto);
router.put('/:id', productosController.updateProducto);
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
