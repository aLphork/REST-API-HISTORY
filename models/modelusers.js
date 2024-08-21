const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = users;