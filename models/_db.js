var Sequelize = require('sequelize');

var db = new Sequelize('postgres://104.236.47.240:5432/chatterbot', {
    logging: false
});

module.exports = db;