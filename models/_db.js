var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false
});

module.exports = db;