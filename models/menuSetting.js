var Sequelize = require('sequelize');
var db = require('./_db');

var menuSetting = db.define('menuSetting', {
    type: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    menuText: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    webUrl: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
});

module.exports = menuSetting;