var router = require('express').Router();
var path = require('path');
module.exports = router;

router.get('/', function(req, res) {
  res.send("You got to the root route");
});

router.use('/users', require('./users'));
router.get('/privacy_policy', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../privacypolicy.html'));
})