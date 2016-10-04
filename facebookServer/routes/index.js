var router = require('express').Router();
module.exports = router;

router.get('/', function(req, res) {
  res.send("You got to the root route");
});

router.use('/users', require('./users'));