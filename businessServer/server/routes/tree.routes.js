var router = require('express').Router();
module.exports = router;

var db = require('../models');
var Node = db.model('node');
var Connection = db.model('connection');
var Business = db.model('business');

//HOW IS PRODUCT ID DEFINED FIRST TIME?
router.get('/:productId', function (req, res, next) {
  Node.findAll({
    where: { productId: req.params.productId },
    include: [ { model: Connection, as: 'from' },
                { model: Connection, as: 'to' }
    ]
  })
  .then(productTree => res.json(productTree));
});

router.post('/', function(req, res) {
    Business.findOne({ where: { id: req.body.businessId } })
        .then(business =>
            Connection.create({
                fromId: business.headNodeId,
                answer: req.body.answer
            })
        )
        .then(connection => res.json(connection))
        .catch(err => console.error(err))
})