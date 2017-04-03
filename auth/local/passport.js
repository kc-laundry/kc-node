/**
 * Created by anasrazafirdousi on 3/28/17.
 */
var User = require('../../models/user.model').User;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup  = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        'contact.email1': email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));
};
