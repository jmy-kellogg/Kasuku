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
    { question: 'What would you like to buy?' },
    { question: 'caf or decaf?', productId: 1 },
    { question: 'What size?', productId: 1 },
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