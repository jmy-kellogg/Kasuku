var Sequelize = require('sequelize');
var db = require('./_db');

var Node = db.define('node', {
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
    },
    topLevel: {
        type: Sequelize.BOOLEAN,
    },
    layer: {
        type: Sequelize.INTEGER
    },
    topLevelNodeIndex: {
        type: Sequelize.INTEGER
    },
    leafNode: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Node;
