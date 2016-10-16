'use strict'
var request = require('request');
var db = require('../models')
var wParse = require('./ai.js');

var Business = db.model('business');
var Node = db.model('node');
var Connection = db.model('connection');
var Conversation = db.model('conversation');
var Chatter = db.model('chatter');
var History = db.model('history');

var BUSINESSID = 1;

function receivedMessage(event, pageToken, businessId) {
    console.log("recieved message businessId", businessId)
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    // console.log("Received message for user %d and page %d at %d with message:",
        // senderID, recipientID, timeOfMessage);
    // console.log(JSON.stringify(message));

    var messageId = message.mid;

    // You may get a text or attachment but not both

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        switch (messageText) {
                case 'thanks':
                  divertMessage(senderID, pageToken, businessId);
                  break;

            default:
                sendTextMessage(senderID, messageText, pageToken, businessId);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received", pageToken, businessId);
    }
}

function divertMessage(recipientId, pageToken, businessId){
  console.log("divert message businessId", businessId)
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: `You're very welcome!`
        }
    };
    callSendAPI(messageData, pageToken, businessId);
}

function sendTextMessage(recipientId, chatterMsg, pageToken, businessId) {
    console.log("send text message businessId", businessId)
    let currentConvo, chatterId;
    recipientId = '' + recipientId;
    Chatter.findOrCreate({ where: { fbAccount: recipientId } })
        .then(chatter => {
            chatterId = chatter[0].id
            // console.log("CHATTERID 1", chatterId);
            return Conversation.findOne({
                //finding the only active conversation for 1b/1c
                where: { done: false, chatterId: chatterId, businessId: BUSINESSID }
            })
        })
        .then(_convo => {
            console.log('THIS SHOULDNT FIRE IF THE PREVIOUS FINDONE DOESNT ')
            if (!_convo || _convo.done === true) {
                return Business.findById(BUSINESSID)
                    .then(business => {
                        // console.log("CHATTERID 2", chatterId);
                        return Conversation.create({ chatterId: chatterId, businessId: business.id, nodeId: business.headNodeId })
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
          let answerMap = _connections.map(_connection => _connection.answer);
          let yesNoAnswer = wParse.parseYesOrNo(chatterMsg);
          let eitherOrAnswer = wParse.parseEitherOr(chatterMsg, answerMap)[0];
          let quantity = wParse.parseQuantity(chatterMsg)
          for (let i = 0; i < _connections.length; i++) {
              if (_connections[i].answer === chatterMsg || 
                  _connections[i].answer === yesNoAnswer || 
                  _connections[i].answer === eitherOrAnswer || 
                  _connections[i].answer === quantity) {
                  // console.log(_connections[i].answer, 'got it.')
                  
                  History.create({
                    businessId: BUSINESSID,
                    chatterFbId: recipientId,
                    connectionId: _connections[i].id
                  })

                  return currentConvo.update({ nodeId: _connections[i].toId })
              }
          }
        return Promise.resolve(currentConvo)
        })
        .then(_convo => {
            return Node.findById(_convo.nodeId)
        })
        .then(node => {
            //continue the conversation or end it and start over
            if (node) {
                var messageData = {
                    recipient: {
                        id: recipientId
                    },
                    message: {
                        text: node.question
                    }
                };
                callSendAPI(messageData, pageToken, businessId);
            } else {
                History.findAll({where: {
                                  businessId: BUSINESSID,
                                  chatterFbId: recipientId
                                },
                                include: [{model: Connection}]
              })
                .then(function(histories) {
                  var price2 = 0;
                  var price = histories.reduce(function(pre, val) {
                    if (val.connection.price) return pre + val.connection.price;
                    return pre
                  }, 0)
                  var table = {};
                  histories.forEach( (history) => {
                    if (history.connection.description) {
                      table[history.connection.description] = history.connection.price
                    }
                  })
                  console.log("PRICE".repeat(500), price, table)
                  histories.forEach(h=>{
                    price2 += h.connection.price;
                    console.log("CONNECTIONS: ".repeat(23), h.connection.description, connection.price, price2)
                })
                })
                .catch(err => console.log("THIS IS AN ERROR".repeat(10), err))
                Business.findById(BUSINESSID)
                .then(_business => {
                    return currentConvo.update({nodeId: _business.headNodeId})
                })
                .then(() => {
                    var messageData = {
                        recipient: {
                            id: recipientId
                        },
                        message: {
                            text: 'Perfect you order has been placed! Let me know if you need anything else'
                        }
                    };
                    callSendAPI(messageData, pageToken, businessId);
                })
            }
        })
}

function callSendAPI(messageData, pageToken, businessId) {
  console.log("callSendAPI businessId", businessId)

    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageToken },
        method: 'POST',
        json: messageData

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            // console.log("Successfully sent generic message with id %s to recipient %s",
                // messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            // console.error(error);
        }
    });
}

function sendGenericMessage(recipientId, pageToken, businessId) {
    console.log("sendGenericMessage businessId", businessId)
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

    callSendAPI(messageData, pageToken, businessId);
}

function receivedPostback(event, pageToken, businessId) {
    console.log("recieved message businessId, recipientId", businessId, recipientID)
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;
    // The 'payload' param is a developer-defined field which is set in a postback 
    // button for Structured Messages. 
    var payload = event.postback.payload;

    console.log("Postback--".repeat(100), senderID, recipientID, timeOfPostback, payload);
    console.log("event".repeat(100), event);    

    // console.log("Received postback for user %d and page %d with payload '%s' " +
    //     "at %d", senderID, recipientID, payload, timeOfPostback);

    // When a postback is called, we'll send a message back to the sender to 
    // let them know it was successful
    // sendTextMessage(senderID, "Postback called", pageToken);

    switch (payload) {
      case 'START_AT_HEAD_NODE': {
        console.log("CREATE AN APPROPRIATE RESPONSE FOR START_AT_HEAD_NODE")
        break;
      }
      case 'CHECKOUT_ORDER': {
        console.log("CREATE AN APPROPRIATE RESPONSE FOR CHECKOUT_ORDER");
        break;
      }
      default: {
        console.log("CREATE A DEFAULT FOR UNKNOWN PAYLOAD ON POSTBACKS");
      }
    }


}



module.exports = {
    receivedMessage,
    sendTextMessage,
    callSendAPI,
    sendGenericMessage,
    receivedPostback
}
