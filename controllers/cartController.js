const Cart = require('../models/Cart');

const cartController = {
  añadirCarrito: async (req, res) => {
    const { idUsuario, idProducto, cantidad } = req.body;

    try {
      await Cart.añadirCarrito(idProducto, idUsuario, cantidad);
      res.status(200).json({ message: 'Producto agregado al carrito correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
    }
  },

  deleteCarrito: async (req, res) => {
    const idUsuario = req.params.idUsuario;

    try {
      await Cart.deleteCarrito(idUsuario);
      res.status(200).json({ message: 'Carrito eliminado correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el carrito.' });
    }
  },

  getAllCarrito: async (req, res) => {
    const idUsuario = req.params.idUsuario;

    try {
      const cartItems = await Cart.getAllCarrito(idUsuario);
      res.status(200).json(cartItems[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el carrito.' });
    }
  },

  eliminarItem: async (req, res) => {
    const idProducto = req.params.idProducto;
    const idUsuario = req.params.idUsuario;

    try {
      await Cart.eliminarItem(idProducto, idUsuario);
      res.status(200).json({ message: 'Producto eliminado del carrito correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
    }
  },

  totalizarCarrito: async (req, res) => {
    const idUsuario = req.params.idUsuario;

    try {
      const total = await Cart.totalizarCarrito(idUsuario);
      res.status(200).json({ total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al calcular el total del carrito.' });
    }
  }
};

module.exports = cartController;
