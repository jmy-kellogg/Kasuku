'use strict'
var db = require('./index');

var Node = require('./node');
var Chatter = require('./chatter');
var Connection = require('./connection');
var Business = require('./business');
var Conversation = require('./conversation');


let chatters = [
    { fbAccount: 11, firstName: 'Billy BuyStuff' }
]
let nodes = [
    { question: 'What would you like to buy?' },
    { question: 'caf or decaf?', productId: 1 },
    { question: 'What size?', productId: 1},
    { question: 'Anything else you can think of?', productId: 1 }
]
let connections = [
    { answer: 'coffee', fromId: 1, toId: 2, businessId: 1 },
    { answer: 'caf', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'decaf', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'large', fromId: 3, toId: 4, businessId: 1 },
    { answer: 'medium', fromId: 3, toId: 4, businessId: 1 }
]

let businesses = [
    { businessName: 'starbucks', fb_account_id: 123, headNodeId: 1 },
    { businessName: 'chatty-A-1', fb_account_id: 123, headNodeId: 1, 
      pageToken: 'EAAX1CK1IcUsBABEh49qLEKbIrv3KPzHvaLuzpnZCjpPW8fTKNl2EDZBedBJQR1LDB19ZB3dZBE8Xd65YR6bGzFuUajiZAtdq75ab5fE6QoDZBtG3EEF9QFHFA2ZC2le2oQNqDVe5StdDuGBHGyFfrgdvLrztAkiSZBj788bZAPuidTgZDZD',
      webhookToken: 'thisIsTheGenericVerifyTokenForFacebookUsingOurAppAndNotTheUserSpecificToken'}
]


db.sync({ force: true })
    .then(function() {
        return Promise.all(
            [
                Node.bulkCreate(nodes),
                Chatter.bulkCreate(chatters),
                Business.bulkCreate(businesses),
                
            ])
    })
    .then(function() {
      Connection.bulkCreate(connections)
    })
    .then(function() {
      process.exit(0);
    })
    // .then(function(proms) {
    //     proms[0].map(elem => console.log(elem))
    // })

// 