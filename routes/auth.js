var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');

router.post('/', function (req, res) {
  console.log('User Login Attempt: %s', req.body.username);

  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return console.log('could not find user: %s', req.body.username);
    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err) {
        console.log('wrong password', err);
      } else {
        res.send(isMatch ? 'YAY! correct password!' : 'wrong password');
      }
    })
  });
});

module.exports = router;
