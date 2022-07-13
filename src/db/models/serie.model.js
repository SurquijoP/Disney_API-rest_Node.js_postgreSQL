const { Model, DataTypes, Sequelize } = require('sequelize');
const { GENDER_TABLE } = require('./gender.model');

 const SERIE_TABLE = 'serie';

 const serieSchemaM =
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
  title:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  creation_date:{
    allowNull: false,
    type: DataTypes.DATE,
  },
  qualification:{
    allowNull: false,
    type: DataTypes.INTEGER,
},
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
},
  genderId:{
    field: 'gender_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: GENDER_TABLE,
      key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
}
}
 class Serie extends Model {
  static associate(models) {
    this.hasMany(models.Character, {
      as: 'character',
      foreignKey: 'serieId',
    });
    this.belongsTo(models.Gender, { as: 'gender'})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: SERIE_TABLE,
      modelName: 'Serie',
      timestamps: false
    }
   }
  };

  module.exports = { serieSchemaM, SERIE_TABLE, Serie };