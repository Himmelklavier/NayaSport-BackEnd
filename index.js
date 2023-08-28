// index.js
const express = require('express');
const app = express();
const PORT = 3001
const cors = require('cors');
app.use(cors());
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/authRoutes');
app.use(express.json());
app.use('/api/productos', productosRoutes);
app.use('/api/auth', usuariosRoutes);

const dbConexion = require('./config/database');
console.log(dbConexion);

app.listen(PORT, () => {
    console.log('La aplicacion esta en linea');
    console.log('en el puerto ' + PORT);
})

