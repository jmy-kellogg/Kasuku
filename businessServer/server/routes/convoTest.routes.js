var router = require('express').Router();
module.exports = router;

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');
var Business = db.model('business');


// req.body {
// 	message : 'whatever they said'
// }

// return {
// 	tellem: 'what they need to ' 
// }

router.post('/', function(req, res){

})