var User = require('./userModel.js');
var bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');

exports.index = function(req, res){
  User.find({}, '-password', function(err, users){
    if(err) return res.status(500).send(err);
    res.status(200).send(users);
  })
};

exports.register = function(req, res, next){
  var newUser = new User(req.body);
  newUser.save(function(err, user){
    if(err) return res.status(422).json(err);
    var token = jwt.sign({_id: user._id}, config.JWT_SECRET, {expiresInMinutes: 60*5});
    res.send({token: token});
  });
};

exports.login = function(req, res, next){

};
