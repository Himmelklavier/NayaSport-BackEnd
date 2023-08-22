const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'srv717.hstgr.io',
  username: 'u240894095_AdminNaya',
  password: 'Naya!2023',
  database: 'u240894095_NayaSport',
  
});

module.exports = sequelize;
