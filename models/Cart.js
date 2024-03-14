const mysql = require('mysql2/promise');

const dbConnection = require('../config/database');

const Cart = {
    defineModel: () => {
      const model = {
        idCart: {
          type: 'INT',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        idUsuario: {
          type: 'INT',
          allowNull: false
        },
        idProducto: {
          type: 'INT',
          allowNull: false
        },
        fechaIngreso: {
          type: 'DATETIME',
          defaultValue: 'CURRENT_TIMESTAMP'
        },
        cantidad: {
          type: 'INT',
          allowNull: false
        },
        precio: {
          type: 'DECIMAL(10,2)',
          allowNull: false
        },
        precio_item: {
            type: 'DECIMAL(10,2)',
            allowNull: false,
            // Aquí no es necesario definirlo en el modelo, ya que es una columna calculada
            // Se calculará automáticamente basándose en la cantidad y el precio
          }
        };
  
      return model;
    },
  
  
    añadirCarrito: async (idProducto, idUsuario, cantidad) => {
        try {
          // Obtener el precio del producto
          const [producto] = await dbConnection.execute(
            'SELECT precio_venta FROM producto WHERE idProducto = ?',
            [idProducto]
          );
    
          if (producto.length === 0) {
            throw new Error('Producto no encontrado');
          }
    
          const precio = producto[0].precio_venta;
    
          // Verificar si el producto ya está en el carrito del usuario
          const [existingCart] = await dbConnection.execute(
            'SELECT * FROM cart WHERE idProducto = ? AND idUsuario = ?',
            [idProducto, idUsuario]
          );
    
          if (existingCart.length > 0) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            await dbConnection.execute(
              'UPDATE cart SET cantidad = cantidad + ? WHERE idProducto = ? AND idUsuario = ?',
              [cantidad, idProducto, idUsuario]
            );
          } else {
            // Si el producto no está en el carrito, agregarlo
            await dbConnection.execute(
              'INSERT INTO cart (idProducto, idUsuario, cantidad, precio) VALUES (?, ?, ?, ?)',
              [idProducto, idUsuario, cantidad, precio] // Calcula el precio_item
            );
          }
        } catch (error) {
          throw error;
        }
    },

  deleteCarrito: async (idUsuario) => {
    try {
      await dbConnection.execute(
        'DELETE FROM cart WHERE idUsuario = ?',
        [idUsuario]
      );
    } catch (error) {
      throw error;
    }
  },

  getAllCarrito: async (idUsuario) => {
    try {
      const [cartItems] = await dbConnection.execute(
        'SELECT p.idProducto, p.nombre, c.cantidad, c.precio FROM cart c INNER JOIN producto p ON c.idProducto = p.idProducto WHERE c.idUsuario = ?',
        [idUsuario]
      );

      let total = 0;
      for (const item of cartItems) {
        total += item.cantidad * item.precio;
      }

      return { items: cartItems, total };
    } catch (error) {
      throw error;
    }
  },

  eliminarItem: async (idProducto, idUsuario) => {
    try {
      await dbConnection.execute(
        'DELETE FROM cart WHERE idProducto = ? AND idUsuario = ?',
        [idProducto, idUsuario]
      );
    } catch (error) {
      throw error;
    }
  },

  totalizarCarrito: async (idUsuario) => {
    try {
      const [total] = await dbConnection.execute(
        'SELECT SUM(cantidad * precio) AS total FROM cart WHERE idUsuario = ?',
        [idUsuario]
      );

      return total[0].total;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Cart;
