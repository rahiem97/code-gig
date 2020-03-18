const sequelize = require('sequelize');
//Connect to the Database with sequelize
module.exports = new sequelize('digitalNomad', 'testUser', '0000', {
    host: 'localhost',
    dialect: 'mysql'
  });