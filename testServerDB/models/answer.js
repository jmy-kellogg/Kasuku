var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('answer', {
  answer: {
    type: Sequelize.STRING
  }
});