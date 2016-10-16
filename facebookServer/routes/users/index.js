'use strict';
var router = require('express').Router();
var request = require('request');
var fbAPI = require('../../ourFbHelpers/fbAPI');
var chalk = require('chalk');
module.exports = router;

var db = require('../../models')
var Business = db.model('business')
var Node = db.model('node')
var Connection = db.model('connection')
var Conversation = db.model('conversation')


var USERID = 1;
var BUSINESSID = 1;

// Use puts the business on the req object as fbRequester;

router.use('/:name', function(req, res, next) {
  // console.log("***** USE ROUTE: /users/:name for name:", req.params.name);
  var requester = { userName: req.params.name};
  
  Business.findOne({where: {username: req.params.name}})
  .then(function(business) {
    if (!business) { 
      // console.log("user not found in database");
      return res.send(403)
    }

    requester.webhookToken = business.webhookToken;
    requester.pageToken = business.pageToken;
    requester.businessId = business.id;
    req.fbRequester = requester;
 
    next();
  })
});

// DON'T TOUCH THIS WORKS
router.get('/:name/fbwebhook', function(req, res, next) {
  var verifyToken = req.fbRequester.webhookToken;
  // THIS IS TO VERIFY FACEBOOK STUFF USING THE USER'S APP'S VERIFYTOKEN
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === verifyToken) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  } 
});


router.post('/:name/fbwebhook', function(req, res, next) {
  console.log(chalk.red("Got to post on /users/:name/fbwebhook"), req.requester); 
  console.log("Got to post on /users/:name/fbwebhook"); 
  
  var data = req.body;
  var pageToken = req.fbRequester.pageToken;
  var businessId = req.fbRequester.businessId;
  //Make sure this is a page subscription 
  if (data.object === 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        // console.log(messagingEvent);
        if (messagingEvent.optin) {
          // receivedAuthentication(messagingEvent, pageToken);
        } else if (messagingEvent.message) {
          fbAPI.receivedMessage(messagingEvent, pageToken, businessId);
        } else if (messagingEvent.delivery) {
          //receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          fbAPI.receivedPostback(messagingEvent, pageToken, businessId);
        } else {
          // console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });
    // console.log("-------------------POST FROM FACEBOOK MESSENGER--------------------");
    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }

});