// controllers/authController.js
const Usuario = require('../models/Usuario');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { email } });
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
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  },

  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.create({
        email,
        password,
        estado: 'activo',
        rol: '2'
      });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  }
};

module.exports = authController;

function generateAuthToken(usuario) {
  // Aquí puedes usar una librería como 'jsonwebtoken' para generar un token JWT
  // y devolverlo para su uso en la autenticación
  // Ejemplo: return jwt.sign({ id: usuario.id }, 'claveSecreta', { expiresIn: '1h' });
}
