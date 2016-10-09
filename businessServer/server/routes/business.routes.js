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
            console.log(req.body);
            return Business.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                businessName: req.body.name,
                headNodeId: node.id
            })
        })
        .then(business => res.json(business))
        .catch( (err) => {
          console.log(err);
          res.status(500).send()
        })
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