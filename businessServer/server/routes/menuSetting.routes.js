var router = require('express').Router();
module.exports = router;

var db = require('../models');
var MenuSetting = db.model('menuSetting');


router.post('/:businessId', function(req, res, next) {
  console.log("HERE", req.body.menuSettingsArray);
  MenuSetting.destroy({where: { businessId: req.params.businessId }})
  .then(function() {
    return MenuSetting.bulkCreate(req.body.menuSettingsArray);
  })
  .then(function(_menuSettings) {
    res.json(_menuSettings);
  })
});


router.get('/:businessId', function (req, res, next) {
  MenuSetting.findAll({where: {businessId: req.params.businessId}})
    .then(function(menuSettings) {
      res.json(menuSettings)
    })
})

// router.put('/:id', function(req, res, next) {
//   Business.findById(req.params.id)
//     .then(function (business) {
//       return business.update(req.body)
//     })
//     .then(function (business) {
//       res.json(business);
//     })
// })