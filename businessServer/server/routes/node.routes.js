var router = require('express').Router();
module.exports = router;

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');


router.use('/', function(req, res, next) {
  console.log("got into the /api/node route");
  next();
})

// also get connections?

router.get('/', function(req, res, next) {
  Node.findAll()
  .then(function(nodes) {
    res.json(nodes);
  }) 
})

router.post('/', function(req, res, next) {
  Node.create( {
    question: req.body.question,
    productId: req.body.productId
  })
  .then(function(node) {
    res.json(node);
  })
});


router.get('/:id', function(req, res, next) {
  Node.findOne({
    where: {id: req.params.id},
    include: [
      {model: Connection, as: 'from'}
    ]
  })
  .then(function(node) {
    res.json(node);
  })
  .catch(function (err) {
    console.log(err);
  })
});




