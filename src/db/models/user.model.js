const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'user';

const userSchemaM = {
  
id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  recoveryToken:{
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
}
}
class User extends Model {
    static associate(models) {
      
    }
    static config(sequelize) {
      return {
        sequelize,
        tableName: USER_TABLE,
        modelName: 'User',
        timestamps: false
      }
     }
    }
   
      module.exports = { userSchemaM, USER_TABLE, User };