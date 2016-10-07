var inquirer = require('inquirer')
var db = require('./models/index');

var Chatter = db.model('chatter');
var Connection = db.model('connection');
var Business = db.model('business');
var Conversation = db.model('conversation');
var Node = db.model('node');

const USERID = 1;
const BUSINESSID = 1;

function main() {
    let chatterMsg;
    let currentConvo;
    prompt()
    .then(_chatterMsg => {
        chatterMsg = _chatterMsg;
        return Conversation.findOne({ where: { chatterId: USERID, businessId: BUSINESSID } })
    })
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
      // insert AI Logic here
      // let answerMap = _connections.map(_connection => _connection.answer);
      // let yesNoAnswer = wParse.parseYesOrNo(chatterMsg);
      // let eitherOrAnswer = wParse.parse(chatterMsg, answerMap)[0];
      
      for (let i = 0; i < _connections.length; i++) {
          // if (_connections[i].answer === yesNoAnswer || _connections[i].answer == eitherOrAnswer) {
          if (_connections[i].answer === chatterMsg) {
              //  set conversation to object.toId. else
              return currentConvo.update({ nodeId: _connections[i].toId })
          }
      }
      return Promise.resolve(currentConvo)
    })
    .then(_convo => {
      return Node.findById(_convo.nodeId)
    }).then(node => {
        if(node){
            console.log(node.question);
            main();
        }
        else{
            currentConvo.update({nodeId:1})
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