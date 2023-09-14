const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: '185.211.7.103',
  user: 'u240894095_AdminNaya',
  password: 'Naya!2023',
  database: 'u240894095_NayaSport',
  connectTimeout: 20000,
});




module.exports = dbConnection;
