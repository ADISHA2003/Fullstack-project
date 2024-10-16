// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Enable timestamps
    underscored: true, // Use snake_case for column names
});

module.exports = User;
