'use strict';
const userModel = require('../models/user.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(userModel.USER_TABLE, userModel.userSchemaM);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(userModel.USER_TABLE);  
  }
};
