const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const dbConnection = require('../config/database');
const refreshTokens = {}; // Almacena los tokens de refresco válidos
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
      const accessToken = generateAuthToken(usuario);
      const usuarioRes = { rol: usuario.Rol_idRol, id: usuario.idUsuario, accessToken: accessToken };
      console.log(usuarioRes);

      return res.status(200).json(usuarioRes);
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
        Rol_idRol: '1'
      };

      const userId = await Usuario.create(usuarioData);
      const accessToken = generateAuthToken(userId);
      const usuarioRes = { id: userId, email, password, estado: 'activo', rol: '1', accessToken: accessToken };
      console.log(usuarioRes);

      return res.status(201).json(usuarioRes);
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
      return res.status(500).json({ error: "Error al registrar el usuario" });
    }
  },

  refreshTokens: async (req, res) => {


    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens[refreshToken]) {
      return res.status(401).json({ message: 'Token de refresco no válido.' });
    }

    jwt.verify(refreshToken, 'claveSecretaRefresh', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token de refresco inválido.' });
      }

      // Si el token de refresco es válido, genera un nuevo token de acceso y responde con él
      const accessToken = jwt.sign({ id: decoded.id }, 'claveSecreta', { expiresIn: '15m' });
      res.json({ accessToken });
    });
  },

};

module.exports = authController;

function generateAuthTokens(usuario) {
  const accessToken = jwt.sign({ id: usuario.idusuario }, 'claveSecreta', { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: usuario.idusuario }, 'claveSecretaRefresh', { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

function generateAuthToken(usuario) {
  const accessToken = jwt.sign({ id: usuario.idusuario }, 'claveSecreta', { expiresIn: '1h' });
  return { accessToken };
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
