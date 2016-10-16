var fetch = require('isomorphic-fetch');
var router = require('express').Router();
module.exports = router;

var db = require('../models');
var MenuSetting = db.model('menuSetting');
var Business = db.model('business');

router.post('/:businessId', function(req, res, next) {
  let menuSettingsArray
  MenuSetting.destroy({where: { businessId: req.params.businessId }})
  .then(function() {
    return MenuSetting.bulkCreate(req.body.menuSettingsArray);
  })
  .then(function(_menuSettings) {
    menuSettingsArray = _menuSettings
    return;
  })
  .then(function() {
    return Business.findById(req.params.businessId);
  })
  .then( (business) => {
    let call_to_actions = createFBPersistenMenuOptions(menuSettingsArray)
    console.log(call_to_actions);
    return fetch('https://graph.facebook.com/v2.6/me/thread_settings?access_token=' + business.pageToken, {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        setting_type: "call_to_actions",
        thread_state: "existing_thread",
        call_to_actions
      })
    })
    .then(function(fbResp) {
      console.log("FB".repeat(40), fbResp.body)
    })
  })
  .then(function() {
    res.json(menuSettingsArray);
  })
});


router.get('/:businessId', function (req, res, next) {
  MenuSetting.findAll({where: {businessId: req.params.businessId}})
    .then(function(menuSettings) {
      res.json(menuSettings)
    })
})

function createFBPersistenMenuOptions(settingsArray) {

  let readyToSendArray = settingsArray.map( (val, index) => {
    let itemObj = {};
    itemObj.title = val.menuText
    // console.log(val);
    switch (val.type) {
      case 'webUrl': {
        itemObj.type = 'web_url';
        itemObj.webUrl = val.webUrl;
        break;
      }
      case 'newOrder': {
        itemObj.type = "postback";
        itemObj.payload = "START_AT_HEAD_NODE"
        break;
      }
      case 'checkout': {
        itemObj.type = "postback"
        itemObj.payload = "CHECKOUT_ORDER"
        break;
      }
    }
    return itemObj
  })

  return readyToSendArray;

}