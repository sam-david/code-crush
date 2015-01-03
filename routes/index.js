var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Score = mongoose.model('Score');
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res, next) {
  var user = new User(req.body)
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

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

module.exports = router;
