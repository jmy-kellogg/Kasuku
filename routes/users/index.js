var router = require('express').Router();
var request = require('request');
module.exports = router;

// var db = require('../../models')
// var Business = db.model('business')
// var Node = db.model('node')
// var Connection = db.model('connection')

router.get('/', function (req, res, next) {
  console.log('***** GET ROUTE: /users/');
  res.send("Inside GET users route");
});

var globalPageVar;

router.use('/:name', function(req, res, next) {
  console.log("***** USE ROUTE: /users/:name for name:", req.params.name);
  var requester = { userName: req.params.name};
  /* THIS LOGIC HERE SHOULD BE EXPORTED TO THE DATABASE. USERS ARE REQUIRED TO CREATE THEIR OWN WEBHOOK 
     PASSWORD WHICH  WILL BE  USED TO CREATE THEIR SPECIFIC WEBHOOK VERIFICATION. THEY ALSO NEED TO SUPPLY 
     THEIR PAGETOKEN WHICH WILL BE USED IN SENDING MESSAGES AND MESSAGE VALIDATION THEREFORE THE USER 
     DATABASE NEEDS TO */
  // Business.findOne({where: {businessName: req.params.name}})
  // .then(function(business) {
  //   console.log(business);
  // }) 
  if (req.params.name === "chatty-A-1") {
    console.log("Inside Middlewhere for /users/:name/fbwebhook")
    requester.webhookToken = 'thisIsTheGenericVerifyTokenForFacebookUsingOurAppAndNotTheUserSpecificToken';
    requester.pageToken = 'EAAX1CK1IcUsBABEh49qLEKbIrv3KPzHvaLuzpnZCjpPW8fTKNl2EDZBedBJQR1LDB19ZB3dZBE8Xd65YR6bGzFuUajiZAtdq75ab5fE6QoDZBtG3EEF9QFHFA2ZC2le2oQNqDVe5StdDuGBHGyFfrgdvLrztAkiSZBj788bZAPuidTgZDZD';
    req.fbRequester = requester;
  } else if (req.params.name === "parkpal") {
    requester.webhookToken = 'thisIsParkPalsVerifyToken';
    requester.pageToken = 'EAACmc3nVHyoBAPRAsTEZB4LJPewKzvBQ3xhi8my8Ng3kZAobxthVZBz2cItInPaota5AQiBNODX7cAYAS5CA5GWuZC1zTJNJpKDlpSzh4X4XAvnnLV6fIE2pv2tBjguA2Hvy9TDHm0kw0yDUHA9Jh0U7ST4pzeDE7OhPhRZATXQZDZD';
    req.fbRequester = requester;
  }
  globalPageVar = req.fbRequester.pageToken;
  //
  next();
});

router.get('/:name/fbwebhook', function(req, res, next) {
  console.log('*************INSIDE GET REQUEST FROM FACEBOOK*******************');
  console.log('***** GET ROUTE: /users/:name/fbwebhook', req.params.name);
  console.log(req.query);
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
  console.log("Got to post on /users/:name/fbwebhook"); 
  var data = req.body;
  var pageToken = req.fbRequester.pageToken;
  console.log(data);
  console.log(pageToken);
  //Make sure this is a page subscription 
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      console.log(data);
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        console.log(messagingEvent);
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent, pageToken);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent, pageToken);
        } else if (messagingEvent.delivery) {
          //receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent, pageToken);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });
    console.log("-------------------POST FROM FACEBOOK MESSENGER--------------------");
    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }

});


function receivedMessage(event, pageToken) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID, pageToken);
        break;

      case 'button':
        sendButtonMessage(senderID, pageToken);
        break;

      case 'generic':
        sendGenericMessage(senderID, pageToken);
        break;

      case 'receipt':
        sendReceiptMessage(senderID, pageToken);
        break;

      default:
        sendTextMessage(senderID, messageText, pageToken);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received", pageToken);
  }
}

function sendTextMessage(recipientId, messageText, pageToken) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData, pageToken);
}

function callSendAPI(messageData, pageToken) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: pageToken },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

function sendGenericMessage(recipientId, pageToken) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData, pageToken);
}

function receivedPostback(event, pageToken) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  sendTextMessage(senderID, "Postback called", pageToken);
}
