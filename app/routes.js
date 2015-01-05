// app/routes.js
var Score = require('../app/models/score');
var User = require('../app/models/user');
module.exports = function(app, passport) {

    // var Score = mongoose.model('Score');
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email']}));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/users/:user_id/scores', function(req, res, next) {
        var user_id = req.params.user_id;
        User.findOne({ '_id' : user_id }, function(err, user) {
            if(err){return next(err);}
        });
        var score = new Score({game: 'Codefall', score: 500, user: ""});
        score.save(function(err, score){
            if(err){return next(err);}
            res.json(score);
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
