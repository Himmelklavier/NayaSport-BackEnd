// index.js
const express = require('express');
const app = express();
const PORT = 3001
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://nayasport.com.co'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

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

