const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const dbConnection = require('../config/database');

const Usuario = require('../models/Usuario'); 

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      if (usuario.password !== password) {
        return res.status(401).json({ message: 'Contraseña incorrecta.' });
      }

      // Genera el token de autenticación y responde con él
      const token = generateAuthToken(usuario);
      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  },

  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuarioData = {
        email,
        password,
        estado: 'activo',
        Rol_idRol: '2'
      };

      const userId = await Usuario.create(usuarioData);
      const usuario = { id: userId, email, password, estado: 'activo', rol: '2' };
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
      res.status(500).json({ error: "Error al registrar el usuario" });
    }
  }
};

module.exports = authController;

function generateAuthToken(usuario) {
  const token = jwt.sign({ id: usuario.idusuario }, 'claveSecreta', { expiresIn: '1h' });
  return token;
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
