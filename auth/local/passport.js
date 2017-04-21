/**
 * Created by anasrazafirdousi on 3/28/17.
 */
var User = require('../../models/user.model').User;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup  = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(email, password, done) {
    var query;

      query = { 'userName': email.toLowerCase() };

      User.findOne(query,
                      function(err, user) {
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
