'use strict';

const characterModel = require('../models/character.model');
const serieModel = require('../models/serie.model');
const genderModel = require('../models/gender.model');

module.exports = {
   up: async (queryInterface) => {
    await queryInterface.createTable(genderModel.GENDER_TABLE, genderModel.genderSchemaM);
    await queryInterface.createTable(serieModel.SERIE_TABLE, serieModel.serieSchemaM);
    
    await queryInterface.createTable(characterModel.CHARACTER_TABLE, characterModel.characterSchemaM);
    
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(characterModel.CHARACTER_TABLE);
    await queryInterface.dropTable(serieModel.SERIE_TABLE);
    await queryInterface.dropTable(genderModel.GENDER_TABLE);
  }
};

