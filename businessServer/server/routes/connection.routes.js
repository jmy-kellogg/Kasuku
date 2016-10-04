var router = require('express').Router();
module.exports = router;

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');

router.use('/', function(req,res,next) {
  console.log('getting to /api/connection routes');
  next();
})

router.get('/', function(req, res, next) {
  Connection.findAll()
    .then(function(connections) {
      res.json(connections);
    });
});

router.get('/:id', function(req, res, next) {
  Connection.findOne( { 
    where: { id: req.params.id },
    include: [
      {model: Node, as: "from"},
      {model: Node, as: "to"}
    ]
  })
  .then(function(connection) {
    res.json(connection)
  })
});

router.post('/', function(req, res, next) {
  // ASSUME WE HAVE A FROM NODE ID PASSED IN req.body
  Connection.create({ 
      answer: req.body.answer,
      fromId: req.body.nodeId,
      productId: req.body.productId,
      businessId: req.body.businessId
    }  
  )
  .then(function(_connection) {
    res.json(_connection);
  })
});
