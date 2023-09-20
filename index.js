// index.js
const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3001
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});











const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/authRoutes');
const imagenesRoutes = require('./routes/imageRoutes');
app.use(express.json());

app.use('/api/productos', productosRoutes);
app.use('/api/auth', usuariosRoutes);
app.use('/api/image', imagenesRoutes);

const dbConexion = require('./config/database');
console.log(dbConexion);

app.listen(PORT, () => {
  console.log('La aplicacion esta en linea');
  console.log('en el puerto ' + PORT);
})

