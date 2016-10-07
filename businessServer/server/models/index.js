var db = require('./_db');

var Node = require('./node');
var Chatter = require('./chatter');
var Connection = require('./connection');
var Business = require('./business');
var Conversation = require('./conversation')

Connection.belongsTo(Node, { as: 'from' })
Connection.belongsTo(Node, { as: 'to' })
Connection.belongsTo(Business, { as: 'business' })

Node.hasMany(Connection, {as: 'from', foreignKey: 'fromId'});
Node.hasMany(Connection, {as: 'to', foreignKey: 'toId'});

Chatter.belongsToMany(Business, { through: Conversation })
Business.belongsToMany(Chatter, { through: Conversation })
Conversation.belongsTo(Node)

Business.belongsTo(Node, { as: 'headNode', foreignKey: 'headNodeId' })
Business.belongsTo(Node, { as: 'restartNode', foreignKey: 'restartNodeId' })

module.exports = db;