const { Model, DataTypes, Sequelize } = require('sequelize');
const { SERIE_TABLE } = require('./serie.model');

 const GENDER_TABLE = 'gender';

 const genderSchemaM =
{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
},
  
  };
   class Gender extends Model {
    static associate(models) {
      this.hasMany(models.Serie, {
        as: 'serie',
        foreignKey: 'genderId'});
    }
    static config(sequelize) {
      return {
        sequelize,
        tableName: GENDER_TABLE,
        modelName: 'Gender',
        timestamps: false
      }
     }
    };
    module.exports = { genderSchemaM, GENDER_TABLE, Gender };