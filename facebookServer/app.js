var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var config = require('config');
var crypto = require('crypto');
var https = require('https');
var request = require('request');
var chalk = require('chalk');
var db = require('./models');

// setup databse on heroku

// Setup and use server


app.set('port', (process.env.PORT || 5000));

db.sync()
  .then(function() {
    console.log('synced');
    app.listen(app.get('port'), function() {
      console.log("We are listening on port", app.get('port'));
    });    
  })
  .catch(function(err) {
    console.log(chalk.red("ERROR"), err);
  });

// Startup Middleware
app.use(express.static(__dirname + '/public')); // maybe don't need
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes'));


