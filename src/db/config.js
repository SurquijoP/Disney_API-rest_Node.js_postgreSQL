const {config} = require('../config.js/config');


module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres'
   },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialecOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
}
