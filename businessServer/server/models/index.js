var db = require('./_db');

var Node = require('./node');
var Chatter = require('./chatter');
var Connection = require('./connection');
var Business = require('./business');
var Conversation = require('./conversation')

Connection.belongsTo(Node, { as: 'from' })
Connection.belongsTo(Node, { as: 'to' })
Connection.belongsTo(Node, { as: 'product' })
Connection.belongsTo(Business, { as: 'business' })


Chatter.belongsToMany(Business, { through: Conversation })
Business.belongsToMany(Chatter, { through: Conversation })
Conversation.belongsTo(Node)

Business.belongsTo(Node, { as: 'headNode' })

module.exports = db;