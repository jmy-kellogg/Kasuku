'use strict'
// need to install rita
// const rita = require('./node_modules/rita/js/rita-full');
const rita = require('rita');
const RS = rita.RiString;
const r = rita.RiTa;


var yes = ['yes', 'y', 'yep', 'sure', 'ok', 'okay'];
var no = ['no', 'n', 'nope', 'never', 'not'];
var greeting = ['hello', 'hi', 'hey']
// need to change: get yes, no, greeting variations from the database


var nouns = ['nn', 'nns', 'nnp', 'nnps'];

var parseYesOrNo = function(utterance){
  var riStr = new RS(str);
  var words = riStr.words();
  for (var x = 0; x < words.length; x++){
    if(yes.includes(words[x].toLowerCase())){
      return 'yes';
    }
    else if(no.includes(words[x].toLowerCase())){
      return 'no';
    }
    else{
      return 'unknown';
      // return words; // return unknown words;
    }
  }
}

var getAnswers = function(utterance, options){
  // utterance is the user text coming in as a string
  // options is the array of available options to select from
  var entities = [];
  // var unknownEntities = [];
  var str = utterance.toLowerCase();

  var riStr = new RS(str);    // create a new RiTa string from the utterance
  var words = riStr.words();  // create an array of the words
  var posArr = riStr.pos();   // create an array of the parts of speech of each word

  // pull all entities from the utterance and store it.
  for (var x = 0; x < words.length; x++){
    if (nouns.includes(posArr[x])){

      if (options.includes(words[x]) ||
          options.includes(r.singularize(words[x])) ||
          options.includes(r.pluralize(words[x])))
        entities.push(words[x]);
      // for creating a database of unknown words
      // else
      //   unknownEntities.push(words[x]);
    }
  }
  return entities;
  // return [entities, unknownEntities];

}

var parseQuantity = function(utterance){
  var str = utterance.toLowerCase();
  var riStr = new RS(str);
  var words = riStr.words();
  var posArr = riStr.pos();
  for (var x = 0; x < words.length; x++){
    if(posArr[x] === 'nnp'){
      if(parseInt(words[x]))
        return parseInt(words[x]);
    }
  }
  return engToNum(utterance);

}

var parseEitherOr = function(utterance, options){
  var answers = getAnswers(utterance,options);
  if(answers.length === 1)
    return answers;
  else
    return [];
}




var parseOptions = function(utterance, options){
  return getAnswers(utterance, options);
}



// var x = parseOptions("lettuce, tomato, Me, with ToMaTo, tomAtoes, and tomatoes", ['tomato','lettuce']);
// console.log(x);
var riStr = new RS('fifty-five');
// // if(!parseInt('rrr'))
// //   console.log('yes');

console.log(riStr.pos());
// //

var num = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};

var factor = {
    'hundred': 100,
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000,
    'quadrillion': 1000000000000000
};

var engToNum = function(str){
  // var str = utterance.toLowerCase();
  var riStr = new RS(str.toLowerCase().replace(/-/g, ' '));
  var words = riStr.words();
  var posArr = riStr.pos();
  var answer = 0;
  for(var x = 0; x < words.length; x++){
    if(posArr[x] === 'cd' || posArr[x] === 'nn' || posArr[x] === 'nns' || posArr === 'vbn' || posArr === 'nnp' || posArr === 'nnps'){
      if(num[words[x]]){
        if(factor[words[x+1]]){
          answer += num[words[x]] * factor[words[x+1]];
          x++;
        }
        else{
          answer += num[words[x]];
        }
      }
      else if(factor[words[x]]){
        answer += factor[words[x]];
      }

    }
  }

  return answer;

}
module.exports = {
  parseYesOrNo: parseYesOrNo,
  getAnswers: getAnswers,
  parseQuantity: parseQuantity,
  parseEitherOr: parseEitherOr,
  parseOptions: parseOptions

}

// test cases
// console.log(parseQuantity('one thousand eighty'));
// console.log(parseQuantity('fifty thousand eighty four'));
// console.log(parseQuantity('nine hundred and twelve'));
// console.log(parseQuantity('I want one thousand eighty'));
// console.log(parseQuantity('I want 55'));
// console.log(parseQuantity('one thousand eighty'));
console.log(getAnswers("i would like some coffee", ["coffee", "tea"]));



// ask question node 1
// they utter (utterance)
// request all connections with fromId equal to question node 
//      --> pull question node, all connections and their respective next nodes
// put connections answers in an array => answerArray
// the switch -> yes/no; quantity; either/or; // based on node-type
// then call appropriateFunction(utterance, answerArray)
// parseOptions returns an answer fromt the answerArray
// Select the Connection whose answer is the answer returned by parseOption
// retrieve next node from Connection ID


