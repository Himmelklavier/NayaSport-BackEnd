const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rutas del carrito
router.post('/addCart', cartController.añadirCarrito);
router.delete('/deleteCart/:idUsuario', cartController.deleteCarrito);
router.get('/allCart/:idUsuario', cartController.getAllCarrito);
router.delete('/deleteItem/:idUsuario/:idProducto', cartController.eliminarItem);
router.get('/total/:idUsuario', cartController.totalizarCarrito);

module.exports = router;
