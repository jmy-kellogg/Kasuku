var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('question', {
  question: {
    type: Sequelize.STRING
  }
});
