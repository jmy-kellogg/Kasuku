//db setup

var path = require('path');
var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: match[4],
  host: match[3],
  logging: true
});

module.exports = db;


