var Sequelize = require('sequelize');
var db = require('./_db');

var Conversation = db.define('conversation', {
	done: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
    }, 
    // id: {
    // 	type: Sequelize.INTEGER,
    // 	primaryKey: true,
    // 	autoIncrement: true
    // }
});

module.exports = Conversation;