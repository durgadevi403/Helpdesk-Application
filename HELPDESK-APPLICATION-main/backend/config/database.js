const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mssql',

    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    },

    logging: process.env.NODE_ENV === 'development'
      ? console.log
      : false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('SQL Server database connection successful.');
  } catch (error) {
    console.error('Unable to connect to SQL Server:', error);
    throw error;
  }
}

module.exports = {
  sequelize,
  initializeDatabase
};