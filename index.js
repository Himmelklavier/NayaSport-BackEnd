// index.js
const express = require('express');
const app = express();
const productosRoutes = require('./routes/productosRoutes');
const usuariosController = require('./controllers/authController');

app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);

