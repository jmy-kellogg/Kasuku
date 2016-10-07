'use strict'
var request = require('request');
var db = require('../models')
var wParse = require('./ai.js');

var Business = db.model('business')
var Node = db.model('node')
var Connection = db.model('connection')
var Conversation = db.model('conversation')


var USERID = 1;
var BUSINESSID = 1;

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

    // CALL A FUNCTION THAT WILL PARSE THE MESSAGE TEXT AND RESPOND WITH THE APPROPRIATE 
    // NODE TEXT

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID, pageToken);
        break;

      // case 'button':
      //   sendButtonMessage(senderID, pageToken);
      //   break;

      // case 'generic':
      //   sendGenericMessage(senderID, pageToken);
      //   break;

      // case 'receipt':
      //   sendReceiptMessage(senderID, pageToken);
      //   break;

      default:
        sendTextMessage(senderID, messageText, pageToken);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received", pageToken);
  }
}

function sendImageMessage(recipientId, pageToken) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "YOU SEND AN IMAGE.... actually, it was just the text image."
    }
  };
  callSendAPI(messageData, pageToken);
}

function sendTextMessage(recipientId, chatterMsg, pageToken) {
  let currentConvo;  

  Conversation.findOne({ where: { chatterId: USERID, businessId: BUSINESSID } })
    .then(_convo => {
      if (!_convo) {
        return Business.findById(BUSINESSID)
        .then(business => {
          return Conversation.create({ chatterId: USERID, businessId: BUSINESSID, nodeId: business.headNodeId })
        })
        .then(__convo => {
          currentConvo = __convo;
          return Node.findById(__convo.nodeId);
        })
      }
      currentConvo = _convo;
      return Node.findById(_convo.nodeId)
    })
    .then(_node => {
      return Connection.findAll({ where: { fromId: _node.id } })
    })
    .then(_connections => {
      // if current object.answer === chatterMsg,
      for (let i = 0; i < _connections.length; i++) {
          if (_connections[i].answer === chatterMsg) {
              //  set conversation to object.toId. else
              return currentConvo.update({ nodeId: _connections[i].toId })
          }
      }
      return Promise.resolve(currentConvo)
    })
    .then(_convo => {
      return Node.findById(_convo.nodeId)
    })
    .then(node => {
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: node.question
        }
      };
      callSendAPI(messageData, pageToken);
    })
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


module.exports = {
  receivedMessage, 
  sendImageMessage,
  sendTextMessage,
  callSendAPI,
  sendGenericMessage,
  receivedPostback
}