const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  changeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = user;
