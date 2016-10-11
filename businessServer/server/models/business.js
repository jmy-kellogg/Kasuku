var Sequelize = require('sequelize');
var db = require('./_db');

var Business = db.define('business', {
    businessName: {
        type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    fbAccount: {
        type: Sequelize.STRING,
    },
    pageToken: {
        type: Sequelize.STRING,
    },
    webhookToken: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    greeting: {
      type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = Business;