const { Sequelize } = require('sequelize');
const setupModels = require('../db/models')
const { config } = require('../config.js/config');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false: true,
}
if (config.isProd){
  options.dialectOptions = {
    ssl: {
     rejectUnauthorized: false
  }
}
};

 const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;

