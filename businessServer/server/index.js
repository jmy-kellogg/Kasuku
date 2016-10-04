'use strict';
// eslint-disable-line new-cap
var router = require('express').Router();
var db = require('./models')
var Business = db.model('business')
var Node = db.model('node')
var Connection = db.model('connection')

router.use('/nodes', require('./routes/node.routes'));
router.use('/connections', require('./routes/connection.routes'));
router.use('/business', require('./routes/business.routes'));
router.use('/product', require('./routes/tree.routes'));

module.exports = router;