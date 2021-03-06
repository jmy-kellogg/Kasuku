'use strict'
var db = require('./models/index');

var Node = require('./models/node');
var Chatter = require('./models/chatter');
var Connection = require('./models/connection');
var Business = require('./models/business');
var Conversation = require('./models/conversation');
var MenuSetting = require('./models/menuSetting');
var History = require('./models/history');

let chatters = [
    { fbAccount: '1035384179912235', firstName: 'Billy BuyStuff' },
    { fbAccount: '12', firstName: 'Paulie Purchasethings' },
    { fbAccount: '13', firstName: 'Adele Acquirer' }
]
let nodes = [
    { question: 'Welcome to Fullstack\'s coffee shop. What order can I get for you?' },
    { question: 'Sure! Does caf or decaf sound better?', productId: 1, topLevel: true },
    { question: 'Would you like any cream with that?', productId: 1, topLevel: true },
    { question: 'Great! Milk, cream, or powder?', productId: 1 },
    { question: '1, 2, or 3?', productId: 1 },
    { question: 'What about sugar. Should I throw some of that goodness in there?', productId: 1, topLevel: true },
    { question: 'Splenda, cane, or agave? ', productId: 1 },
    { question: '1, 2, or 3 scoops?', productId: 1 },
    { question: 'What size works best? Small, medium, or large?', productId: 1, topLevel: true },
    { question: 'Perfect! Your order has been placed.', productId: 1},
    { question: 'Would you like green tea or black tea?', productId: 2, topLevel: true },
    { question: 'Would any milk added?', productId: 2, topLevel: true },
    { question: 'whole, skim, or 2%?', productId: 2 },
    { question: 'What about sugar. Should I throw some of that goodness in there?', productId: 1, topLevel: true },
    { question: 'splenda, cane, or agave? ', productId: 2 },
    { question: '1, 2, or 3 scoops?', productId: 2 },
    { question: 'Would you like a slice of Lemon?', productId: 2},
    { question: 'Great, size works best? small, medium, or large?', productId: 2, topLevel: true },




]
let connections = [
    { answer: 'coffee', fromId: 1, toId: 2, businessId: 1},
    { answer: 'caf', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'decaf', fromId: 2, toId: 3, businessId: 1 },
    { answer: 'yes', fromId: 3, toId: 4, businessId: 1, price: 50, description: "Milk" },
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
    { answer: 'agave', fromId: 7, toId: 8, businessId: 1, price: 10, description: "agave" },
    { answer: '1', fromId: 8, toId: 9, businessId: 1 },
    { answer: '2', fromId: 8, toId: 9, businessId: 1 },
    { answer: '3', fromId: 8, toId: 9, businessId: 1 },
    { answer: 'small', fromId: 9, businessId: 1 ,  price: 500, description: "small Coffee" },
    { answer: 'medium', fromId: 9, businessId: 1, price: 600, description: "medium coffee"},
    { answer: 'large', fromId: 9, businessId: 1, price: 750, description: "large coffee"},
    { answer: 'tea', fromId: 1, toId: 11, businessId: 1 },
    { answer: 'green', fromId: 11, toId: 12, businessId: 1 },
    { answer: 'black', fromId: 11, toId: 12, businessId: 1 },
    { answer: 'green tea', fromId: 11, toId: 12, businessId: 1 },
    { answer: 'black tea', fromId: 11, toId: 12, businessId: 1 },
    { answer: 'yes', fromId: 12, toId: 13, businessId: 1 },
    { answer: 'whole', fromId: 13, toId: 14, businessId: 1 },
    { answer: 'skim', fromId: 13, toId: 14, businessId: 1 },
    { answer: '2%', fromId: 13, toId: 14, businessId: 1 },
    { answer: 'no', fromId: 12, toId: 14, businessId: 1 },
    { answer: 'yes', fromId: 14, toId: 15, businessId: 1 },
    { answer: 'splenda', fromId: 15, toId: 16, businessId: 1 },
    { answer: 'cane', fromId: 15, toId: 16, businessId: 1 },
    { answer: 'agave', fromId: 15, toId: 16, businessId: 1 },
    { answer: '1', fromId: 16, toId: 18, businessId: 1 },
    { answer: '2', fromId: 16, toId: 18, businessId: 1 },
    { answer: '3', fromId: 16, toId: 18, businessId: 1 },
    { answer: 'no', fromId: 14, toId: 17, businessId: 1 },
    { answer: 'yes', fromId: 17, toId: 18, businessId: 1 },
    { answer: 'no', fromId: 17, toId: 18, businessId: 1 },
    { answer: 'small', fromId: 18, businessId: 1 },
    { answer: 'medium', fromId: 18, businessId: 1 },
    { answer: 'large', fromId: 18, businessId: 1 },
]

let businesses = [{
    businessName: 'chatty-A-1',
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
  {type: "webUrl", menuText: "T.O.S", webUrl: "https://www.recordboox.com/terms_of_service", businessId: 1},
  {type: "checkout", menuText: 'Checkout', businessId: 1}
]


db.sync({ force: true })
    .then(function() {
        console.log('dropped db'.repeat(100))
        return Promise.all([
                Node.bulkCreate(nodes),
                Chatter.bulkCreate(chatters),
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
