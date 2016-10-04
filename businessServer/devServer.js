var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var bodyParser = require('body-parser')
var app = express();
var compiler = webpack(config);
var db = require('./server/models');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', require('./server'))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

db.sync()
  .then(function() {
    app.listen(1337, 'localhost', function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Listening at http://localhost:1337');
    })
  })
  .catch(function(err) {
    console.log("Error syncing DB", err);
  });