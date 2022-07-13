const { Character, characterSchemaM} = require ('./character.model.js');
const { Serie, serieSchemaM} = require ('./serie.model');
const { Gender, genderSchemaM } = require('./gender.model');
const { User, userSchemaM } = require('./user.model')


function setupModels(sequelize) {
  Character.init(characterSchemaM,Character.config(sequelize));
  Serie.init(serieSchemaM,Serie.config(sequelize));
  Gender.init(genderSchemaM,Gender.config(sequelize));
  User.init(userSchemaM,User.config(sequelize));
  //associates
  Character.associate(sequelize.models);
  Serie.associate(sequelize.models); 
  Gender.associate(sequelize.models);
 };


module.exports = setupModels;