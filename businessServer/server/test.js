var inquirer = require('inquirer')
var db = require('./models/index');

var Chatter = db.model('chatter');
var Connection = db.model('connection');
var Business = db.model('business');
var Conversation = db.model('conversation');
var Node = db.model('node');

var wParse = require('../../facebookServer/ourFbHelpers/ai.js');

const USERID = 1;
const BUSINESSID = 1;

function main() {
    let chatterMsg;
    let currentConvo;
    prompt()
    //find open conversation between the chatter/business
    .then(_chatterMsg => {
        chatterMsg = _chatterMsg;
        return Conversation.findOne({ where: { done: false, chatterId: USERID, businessId: BUSINESSID } })
    })
    //if there are none create a new conversation
    .then(_convo => {
      if (!_convo || _convo.done === true) {
        return Business.findById(BUSINESSID)
        .then(business => {
          return Conversation.create({ chatterId: USERID, businessId: BUSINESSID, nodeId: business.headNodeId });
        })
    //setting the current conversation and return the node 
        .then(__convo => {
          currentConvo = __convo;
          return Node.findById(__convo.nodeId);
        })
      }
      currentConvo = _convo;

      return Node.findById(_convo.nodeId)
    })
    //find connections to that node 
    .then(_node => {
      return Connection.findAll({ where: { fromId: _node.id } })    
    })
    //apply ai logic to all of the connections
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
              console.log(_connections[i].answer, 'got it.')
              return currentConvo.update({ nodeId: _connections[i].toId })
          }
      }
      return Promise.resolve(currentConvo)
    })
    //return current coveration node
    .then(_convo => {
      return Node.findById(_convo.nodeId)
    }).then(node=> {
      //if there's a node start over
        if(node){
            console.log(node.question);
            main();
        }
        else{
      //else the end the conversation and restart    
            console.log('Perfect, your order has been placed! Let me know if you need anything else.');
            return Business.findById(BUSINESSID)
            .then(business => {
              return currentConvo.update({ nodeId: business.headNodeId })
            })
            // return Conversation.findOne({ where: { done: false, chatterId: USERID, businessId: BUSINESSID } })
            //   .then(_convo=>{  
            //       _convo.done = true;
            //       return _convo.save()
            //     })
            .then(() => {main()})
        }
    })
    .catch((err) => {
        console.log('- - - the following messed up - - - '.repeat(2));
        console.log(err);
        main()
    })
}

function prompt() {
    return inquirer.prompt({ name: 'chatterId', message: '>>> ' })
        .then(answer => answer.chatterId)
}

function ask(question) {
    return inquirer.prompt({ name: 'quest', message: question.prompt })
}

main()