const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

const multer = require("multer");

router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);
router.post('/', multer().single("imagen"), productosController.createProducto);
router.put('/:id', productosController.updateProducto);
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
