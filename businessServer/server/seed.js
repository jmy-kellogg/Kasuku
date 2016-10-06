'use strict';
var db = require('./models/index');

var Node = require('./models/node');
var Chatter = require('./models/chatter');
var Connection = require('./models/connection');
var Business = require('./models/business');
var Conversation = require('./models/conversation');


let chatters = [
    { fbAccount: 11, firstName: 'Billy BuyStuff' },
    { fbAccount: 12, firstName: 'Paulie Purchasethings' },
    { fbAccount: 13, firstName: 'Adele Acquirer' }
]
let nodes = [
    { question: 'Welcome to coffee shop. What order can I get started for you?' },
    { question: 'Does caf or decaf sound better?', productId: 1, topLevel: true },
    { question: 'Would you like any cream with that?', productId: 1, topLevel: true },
    { question: 'Milk, cream, or powder?', productId: 1, topLevel: true },
    { question: '1, 2, or 3?', productId: 1, topLevel: true },
    { question: 'What about sugar. Should I throw some of that goodness in there?', productId: 1, topLevel: true },
    { question: 'Splenda, cane, or agave? ', productId: 1, topLevel: true },
    { question: '1, 2, or 3 scoops?', productId: 1, topLevel: true },
    { question: 'What size works best? Small, medium, or large?', productId: 1, topLevel: true }
]
let connections = [
    { answer: 'coffee', fromId: 1, toId: 2, businessId: 1 },
    { answer: 'caf', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'decaf', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'yes', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'no', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'yes', fromId: 3, toId: 4, businessId: 1 },
    { answer: 'no', fromId: 3, toId: 6, businessId: 1 },
    { answer: 'milk', fromId: 4, toId: 5, businessId: 1 },
    { answer: 'cream', fromId: 4, toId: 5, businessId: 1 },
    { answer: 'powder', fromId: 4, toId: 5, businessId: 1 },
    { answer: '1', fromId: 5, toId: 6, businessId: 1 },
    { answer: '2', fromId: 5, toId: 6, businessId: 1 },
    { answer: '3', fromId: 5, toId: 6, businessId: 1 },
    { answer: 'yes', fromId: 6, toId: 7, businessId: 1 },
    { answer: 'no', fromId: 6, toId: 9, businessId: 1 },
    { answer: 'splenda', fromId: 7, toId: 8, businessId: 1 },
    { answer: 'cane', fromId: 7, toId: 8, businessId: 1 },
    { answer: 'agave', fromId: 7, toId: 8, businessId: 1 },
    { answer: '1', fromId: 8, toId: 9, businessId: 1 },
    { answer: '2', fromId: 8, toId: 9, businessId: 1 },
    { answer: '3', fromId: 8, toId: 9, businessId: 1 },
    { answer: 'small', fromId: 9, businessId: 1 },
    { answer: 'medium', fromId: 9, businessId: 1 },
    { answer: 'large', fromId: 9, businessId: 1 },


]

let businesses = [
    { businessName: 'starbucks', fb_account_id: 123, headNodeId: 1 }
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
        return Connection.bulkCreate(connections)
    })
    .then(() => {
        process.exit()
    })