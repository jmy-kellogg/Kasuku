var Sequelize = require('sequelize');
var db = require('./_db');

var Conversation = db.define('conversation', {
	done: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
    }
});

module.exports = Conversation;