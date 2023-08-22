const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'hostinger_host',
  username: 'db_username',
  password: 'db_password',
  database: 'db_name',
  // ... Otras configuraciones
});

module.exports = sequelize;
