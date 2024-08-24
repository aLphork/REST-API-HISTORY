const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');

const UserHistory = sequelize.define('usersHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  previousName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  previousSurname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  changeDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},{
  freezeTableName: true 
 });

module.exports = UserHistory;
