var Sequelize = require('sequelize');
var db = require('./_db');

var History = db.define('history', {
    businessId: {
        type: Sequelize.INTEGER,
    },
    chatterFbId: {
        type: Sequelize.STRING,
    }
});

module.exports = History;