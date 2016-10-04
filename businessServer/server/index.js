'use strict';
// eslint-disable-line new-cap
var router = require('express').Router();
var db = require('./models')
var Business = db.model('business')
var Node = db.model('node')
var Connection = db.model('connection')

router.use('/nodes', require('./routes/node.routes'));
router.use('/connections', require('./routes/connection.routes'));

router.post('/business', function(req, res) {
    Node.create({ question: req.body.welcomeMsg })
        .then(node => {
            return Business.create({
                businessName: req.body.name,
                headNodeId: node.id
            })
        })
        .then(business => res.json(business))
})

router.post('/product', function(req, res) {
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

router.post('/node', function(req, res) {
    Connection.findAll({ where: { toId: null } })
        .then(nodes => res.json(nodes))
        .catch(err => console.log(err))
})

router.post('/connection', function(req, res) {

})























module.exports = router;