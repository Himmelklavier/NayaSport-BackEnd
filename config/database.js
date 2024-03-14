const mysql = require('mysql2/promise');

/* const dbConnection = mysql.createPool({
  host: '193.203.175.52',
  user: 'u240894095_AdminNaya',
  password: 'Naya!2023',
  database: 'u240894095_NayaSport',
  connectTimeout: 20000,
}); */
const dbConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'naya',
  connectTimeout: 20000,
});




module.exports = dbConnection;
