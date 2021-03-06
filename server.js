process.env.NODE_ENV = process.env.NODE_ENV || 'development';
global.$config = require('./config/main');
global._ = require('lodash');

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var whitelistUrls = [];
var optionObj = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelistUrls.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }

if ($config.env === 'development') {
  whitelistUrls.push('http://localhost:3000');
}
if ($config.env === 'production') {
  whitelistUrls.push($config.productionURL);
}
};


app.use(cors(optionObj));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect($config.mongo.url);

require('./routes')(app);

app.listen($config.port, function(){
  console.log("Listening on " + $config.port);
});

exports = module.exports = app;
