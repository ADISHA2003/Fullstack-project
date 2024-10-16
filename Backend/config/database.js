// config/database.js
require('dotenv').config(); // Load environment variables from .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // This might be optional if Sequelize can infer it
    underscored: true,
    // ... other Sequelize options if needed
});

module.exports = sequelize;
