var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Scores = mongoose.model('Score');
var User = mongoose.model('User');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/users', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if(err){return next(err);}
    console.log(user);
    res.json(user);
  });
});

router.get('/users', function(req, res, next) {
  User.find(function(err, users) {
    if(err){return next(err);}
    res.json(users);
  });
});

module.exports = router;
