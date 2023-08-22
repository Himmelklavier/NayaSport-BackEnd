// controllers/usuariosController.js
const Usuario = require('../models/Usuario');

const usuariosController = {
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
  },
  getUsuarioById: async (req, res) => {
    const id = req.params.id;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
  },
  createUsuario: async (req, res) => {
    const { email, password, estado } = req.body;
    try {
      const usuario = await Usuario.create({
        email,
        password,
        estado
      });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario.' });
    }
  },
  updateUsuario: async (req, res) => {
    const id = req.params.id;
    const { email, password, estado } = req.body;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      await usuario.update({
        email,
        password,
        estado
      });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario.' });
    }
  },
  deleteUsuario: async (req, res) => {
    const id = req.params.id;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      await usuario.destroy();
      res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
  }
};

module.exports = usuariosController;
