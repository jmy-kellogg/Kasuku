// sets up database relationships

var db = require('./_db');
module.exports = db;

var Response = require('./models/answer');
var Question = require('./models/question');

Question.hasMany(Response);
Response.belongsTo(Question);


