var Sequelize = require('sequelize');
var db = require('./_db');

var Node = db.define('node', {
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
    }
});

module.exports = Node;