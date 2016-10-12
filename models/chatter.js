var Sequelize = require('sequelize');
var db = require('./_db');

var Chatter = db.define('chatter', {
    fbAccount: {
        type: Sequelize.STRING,
        defaultValue: 1,
        foreignKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
    }
});

module.exports = Chatter;