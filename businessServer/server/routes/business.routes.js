var router = require('express').Router();
module.exports = router;

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');
var Business = db.model('business');


router.post('/', function(req, res, next) {
    req.body.welcomeMsg = req.body.welcomeMsg || "Welcome! Picka  product"
    Node.create({ question: req.body.welcomeMsg })
        .then(node => {
            return Business.create({
                businessName: req.body.name,
                headNodeId: node.id
            })
        })
        .then(business => res.json(business))
});

router.get('/', function(req, res, next) {
  Business.findAll()
    .then(function(businesses) {
      res.json(businesses);
    })
})

router.get('/:id', function (req, res, next) {
  Business.findOne({where: {id: req.params.id}})
    .then(function(business) {
      res.json(business)
    })
})