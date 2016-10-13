var Sequelize = require('sequelize');
var db = require('./_db');

var Connection = db.define('connection', {
    answer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    productId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Connection;
