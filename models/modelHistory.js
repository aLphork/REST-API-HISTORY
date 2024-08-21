const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const authenticateToken = require('../middleware/auth');
const users = require('./modelusers');

const userHistory = sequelize.define('userHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: users,
            key: 'id'
        }
    },
    changeDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

users.hasMany(userHistory, {foreignKey: 'userId'});
userHistory.belongsTo(users, {foreignKey: 'userId'});

module.exports = userHistory;