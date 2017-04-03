/**
 * Created by anasrazafirdousi on 3/28/17.
 */
var User = require('../../models/user.model').User;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup  = function (User, config) {

  console.log(config);

  passport.use(new FacebookStrategy({
      clientID: config.facebook.api_key,
      clientSecret: config.facebook.api_secret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
    console.log("************ PROFILE *******************");
    console.log(profile);
    console.log("****************************************");

    return done(null,profile);
      // User.findOne({
      //     'facebook.id': profile.id
      //   },
      //   function(err, user) {
      //     if (err) {
      //       return done(err);
      //     }
      //     if (!user) {
      //       user = new User({
      //         role: 'user',
      //         userName: profile.username,
      //         provider: 'facebook',
      //         facebook: {
      //           displayName:profile.displayName,
      //           email:profile.email[0].value,
      //           userName:profile.username,
      //           accessToken: accessToken,
      //           isActive:true,
      //           detail:profile._json
      //         }
      //       });
      //       user.facebook.accessToken = accessToken;
      //       user.save(function(err) {
      //         if (err) done(err);
      //         return done(err, user);
      //       });
      //     } else {
      //       return done(err, user);
      //     }
      //   })
    }
  ));
};

//
// facebook: {
//   displayName:{
//     type:String
//   },
//   email :{
//     type:String
//   },
//   userName :{
//     type:String
//   },
//   accessToken: {
//     type:String
//   } ,
//   isActive:{
//     type:Boolean
//   },
//   detail:{
//     type:String
//   }
// }

