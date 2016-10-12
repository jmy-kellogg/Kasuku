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
      console.log(fbResp)
      // add code to check fbResponse here and handle errors
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
      case 'webUrl':
        itemObj.type = 'web_url';
        itemObj.url = val.webUrl;
        break;
      case 'newOrder':
        itemObj.type = "postback";
        itemObj.payload = "START_AT_HEAD_NODE"
        break
      case 'checkout':
        itemObj.type = "postback"
        itemObj.payload = "CHECKOUT_ORDER"
        break
    }

    return itemObj
  })

  return readyToSendArray;

}

// [ { type: 'web_url',
//     title: 'Rboox',
//     url: 'https://www.recordboox.com' },
//   { type: 'postback',
//     title: 'New Order',
//     payload: 'START_AT_HEAD_NODE' },
//   { type: 'web_url',
//     title: 'T.O.Serss',
//     url: 'https://www.recordboox.com/terms_of_service' },
//   { type: 'postback',
//     title: 'Checkout My Stuffs',
//     payload: 'START_AT_HEAD_NODE' } ]

// [ { title: 'Rboox',
//     type: 'web_url',
//     webUrl: 'https://www.recordboox.com' },
//   { title: 'New Order',
//     type: 'postback',
//     payload: 'START_AT_HEAD_NODE' },
//   { title: 'T.O.Serss',
//     type: 'web_url',
//     webUrl: 'https://www.recordboox.com/terms_of_service' } ]

// [ { title: 'Rboox',
//     type: 'web_url',
//     webUrl: 'https://www.recordboox.com' },
//   { title: 'New Order',
//     type: 'postback',
//     payload: 'START_AT_HEAD_NODE' },
//   { title: 'T.O.Serss',
//     type: 'web_url',
//     webUrl: 'https://www.recordboox.com/terms_of_service' },
//   { title: 'Checkout My Stuf',
//     type: 'postback',
//     payload: 'CHECKOUT_ORDER' } ]