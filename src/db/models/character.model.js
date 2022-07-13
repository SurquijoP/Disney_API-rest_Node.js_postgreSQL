const { Model, DataTypes, Sequelize } = require('sequelize');
const { SERIE_TABLE } = require('./serie.model');

 const CHARACTER_TABLE = 'character';

 const characterSchemaM =
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
  edad:{
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  peso:{
      allowNull: false,
      type: DataTypes.INTEGER,
  },
  historia:{
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
},
serieId:{
  field: 'serie_id',
  allowNull: false,
  type: DataTypes.INTEGER,
  unique: false,
  references: {
    model: SERIE_TABLE,
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
}
};
 class Character extends Model {
  static associate(models) {
    this.belongsTo(models.Serie, {as: 'serie'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_TABLE,
      modelName: 'Character',
      timestamps: false
    }
   }
  };

  module.exports = { characterSchemaM, CHARACTER_TABLE, Character };