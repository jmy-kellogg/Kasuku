var router = require('express').Router();
module.exports = router;

var getChatResponse = require('../convoTestLogic')

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');
var Business = db.model('business');


// req.body {
// 	input : 'hello mr. chatterbot sir'
// }

// return {
// 	message: 'Welcome to coffee shop. What order can I get for you?' 
// }

router.post('/', function(req, res){
	getChatResponse(req.body.input)
	.then(message => {
		res.json({message})
	})
})