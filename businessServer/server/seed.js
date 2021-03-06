// 'use strict';
var db = require('./models/index');

var Node = require('./models/node');
var Chatter = require('./models/chatter');
var Connection = require('./models/connection');
var Business = require('./models/business');
var Conversation = require('./models/conversation');
var MenuSetting = require('./models/menuSetting');

let chatters = [
    { fbAccount: 11, firstName: 'Billy BuyStuff' },
    { fbAccount: 12, firstName: 'Paulie Purchasethings' },
    { fbAccount: 13, firstName: 'Adele Acquirer' }
]
let nodes = [
    {
        question: 'Welcome to our coffee shop! What can I get started for you?',
        layer: 0
    },
    {
        question: 'Does caf or decaf sound better?',
        productId: 1,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 0
        ,
        leafNode: false
    },
    {
        question: 'Would you like any cream with that?',
        productId: 1,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 1,
        leafNode: false
    },
    {
        question: 'Great! Milk, cream, or powder?',
        productId: 1,
        topLevel: false,
        layer: 2,
        topLevelNodeIndex: 1,
        leafNode: false
    },
    {
        question: '1, 2, or 3?',
        productId: 1,
        topLevel: false,
        layer: 3,
        topLevelNodeIndex: 1,
        leafNode: true
    },
    {
        question: 'What about sugar. Should I throw some of that goodness in there?',
        productId: 1,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 2,
        leafNode: false
    },
    {
        question: 'Cool! Splenda, cane, or agave? ',
        productId: 1,
        topLevel: false,
        layer: 2,
        topLevelNodeIndex: 2,
        leafNode: false
    },
    {
        question: '1, 2, or 3 scoops?',
        productId: 1,
        topLevel: false,
        layer: 2,
        topLevelNodeIndex: 2,
        leafNode: true
    },
    {
        question: 'Gotcha. And what size works best? Small, medium, or large?',
        productId: 1,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 3,
        leafNode: false
    },
    {
        question: 'Perfect! Your coffee order has been placed :)',
        productId: 1,
        topLevel: false,
        layer: 2,
        topLevelNodeIndex: 3,
        leafNode: true
    },
    {
        question: 'Would you like green or black?',
        productId: 2,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 0,
        leafNode: false
    },
    {
        question: 'Would any milk added?',
        productId: 2,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 1,
        leafNode: false
    },
    {
        question: 'whole, skim, or 2%?',
        productId: 2,
        topLevel: false,
        layer: 2,
        topLevelNodeIndex: 1,
        leafNode: true
    },
    {
        question: 'What about sugar. Should I throw some of that goodness in there?',
        productId: 2,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 2,
        leafNode: false
    },
    {
        question: 'splenda, cane, or agave? ',
        productId: 2,
        topLevel: false,
        layer: 2,
        topLevelNodeIndex: 2,
        leafNode: false
    },
    {
        question: '1, 2, or 3 scoops?',
        productId: 2,
        topLevel: false,
        layer: 3,
        topLevelNodeIndex: 2,
        leafNode: true
    },
    {
        question: 'Would you like a slice of Lemon?',
        productId: 2,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 3,
        leafNode: false
    },
    {
        question: 'Great, size works best? small, medium, or large?',
        productId: 2,
        topLevel: true,
        layer: 1,
        topLevelNodeIndex: 3,
        leafNode: true
    }

]
let connections = [
    {
        answer: 'coffee',
        fromId: 1,
        toId: 2,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'tea',
        fromId: 1,
        toId: 11,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'caf',
        fromId: 2,
        toId: 3,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'decaf',
        fromId: 2,
        toId: 3,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'yes',
        fromId: 3,
        toId: 4,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'no',
        fromId: 3,
        toId: 6,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'milk',
        fromId: 4,
        toId: 5,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'cream',
        fromId: 4,
        toId: 5,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'powder',
        fromId: 4,
        toId: 5,
        businessId: 1,
        productId: 1
    },
    {
        answer: '1',
        fromId: 5,
        toId: 6,
        businessId: 1,
        productId: 1
    },
    {
        answer: '2',
        fromId: 5,
        toId: 6,
        businessId: 1,
        productId: 1
    },
    {
        answer: '3',
        fromId: 5,
        toId: 6,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'yes',
        fromId: 6,
        toId: 7,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'no',
        fromId: 6,
        toId: 9,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'splenda',
        fromId: 7,
        toId: 8,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'cane',
        fromId: 7,
        toId: 8,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'agave',
        fromId: 7,
        toId: 8,
        businessId: 1,
        productId: 1
    },
    {
        answer: '1',
        fromId: 8,
        toId: 9,
        businessId: 1,
        productId: 1
    },
    {
        answer: '2',
        fromId: 8,
        toId: 9,
        businessId: 1,
        productId: 1
    },
    {
        answer: '3',
        fromId: 8,
        toId: 9,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'small',
        fromId: 9,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'medium',
        fromId: 9,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'large',
        fromId: 9,
        businessId: 1,
        productId: 1
    },
    {
        answer: 'green',
        fromId: 11,
        toId: 12,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'black',
        fromId: 11,
        toId: 12,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'green tea',
        fromId: 11,
        toId: 12,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'black tea',
        fromId: 11,
        toId: 12,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'yes',
        fromId: 12,
        toId: 13,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'whole',
        fromId: 13,
        toId: 14,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'skim',
        fromId: 13,
        toId: 14,
        businessId: 1,
        productId: 2
    },
    {
        answer: '2%',
        fromId: 13,
        toId: 14,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'no',
        fromId: 12,
        toId: 14,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'yes',
        fromId: 14,
        toId: 15,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'splenda',
        fromId: 15,
        toId: 16,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'cane',
        fromId: 15,
        toId: 16,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'agave',
        fromId: 15,
        toId: 16,
        businessId: 1,
        productId: 2
    },
    {
        answer: '1',
        fromId: 16,
        toId: 18,
        businessId: 1,
        productId: 2
    },
    {
        answer: '2',
        fromId: 16,
        toId: 18,
        businessId: 1,
        productId: 2
    },
    {
        answer: '3',
        fromId: 16,
        toId: 18,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'no',
        fromId: 14,
        toId: 17,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'yes',
        fromId: 17,
        toId: 18,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'no',
        fromId: 17,
        toId: 18,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'small',
        fromId: 18,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'medium',
        fromId: 18,
        businessId: 1,
        productId: 2
    },
    {
        answer: 'large',
        fromId: 18,
        businessId: 1,
        productId: 2
    },

]
let businesses = [{
    businessName: 'chatty-A-1',
    username: 'chatty-A-1',
    fb_account_id: 123,
    headNodeId: 1,
    restartNodeId: 10,
    pageToken: 'EAAX1CK1IcUsBABEh49qLEKbIrv3KPzHvaLuzpnZCjpPW8fTKNl2EDZBedBJQR1LDB19ZB3dZBE8Xd65YR6bGzFuUajiZAtdq75ab5fE6QoDZBtG3EEF9QFHFA2ZC2le2oQNqDVe5StdDuGBHGyFfrgdvLrztAkiSZBj788bZAPuidTgZDZD',
    webhookToken: 'thisIsTheGenericVerifyTokenForFacebookUsingOurAppAndNotTheUserSpecificToken',
    email: "chatty-A-1@stuff.com",
    greeting: "Hi, there. Welcome to Chatty-A-1"
}]

let menuSettings = [
  {type: "webUrl", menuText: "Rboox", webUrl: "https://www.recordboox.com", businessId: 1},
  {type: "newOrder", menuText: "New Order", businessId: 1},
  {type: "webUrl", menuText: "T.O.S", webUrl: "https://www.recordboox.com/terms_of_service", businessId: 1}
]


db.sync({ force: true })
    .then(function() {
        return Promise.all(
            [
                Node.bulkCreate(nodes),
                Chatter.bulkCreate(chatters),

            ])
    })
    .then(function() {
        return Promise.all(
            [
                Business.bulkCreate(businesses)

            ])
    })
    .then(function() {
        return Connection.bulkCreate(connections)
    })
    .then(function() {
      return MenuSetting.bulkCreate(menuSettings)
    })
    .then(() => {
        console.log("finished")
        process.exit()
    })

