var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');

router.get('/', function(req, res) {
  User.find(function (err, users) {
    res.render('user', {
      userlist: users
    });
  })
});

router.post('/', function (req, res) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      // TODO: Handle errors
      User.create({
        username: req.body.username,
        password: hash
      });

      res.redirect('users');
    });
  });
});

module.exports = router;
