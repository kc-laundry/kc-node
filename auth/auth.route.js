/**
 * Created by anasrazafirdousi on 3/28/17.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config/dev.config.json');
var utilService = require('../services/util.service');
var userService = require('../services/users.service');
var userNotifications = require('../services/userNotifications.service');
var _ = require('lodash');


app.get('/profile', isLoggedIn, function(req, res) {
  res.send(
    {
      isLoggedIn: true,
      user : req.user // get the user out of session and pass to template
    }
  );
});


app.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}



module.exports = router;
