var Sequelize = require('sequelize');
var db = require('./_db');

var Connection = db.define('connection', {
    answer: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Connection;