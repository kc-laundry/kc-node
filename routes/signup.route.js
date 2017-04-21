var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var userService = require('../services/users.service');
var _ = require('lodash');

router.post('/', function(req, res, next) {

  var userName;
  var password;
  var contact = {};
  var firstName;
  var lastName;
  var dob;
  var social = {};

  var isSocialSignUp = false; // By default

  // Initialize customer to Bronze membership
  var customerLevel = "B"; //B : Bronze, S: Silver, G: Gold, P:Platinum

  //Initialize customer type to individual
  //TODO(anas): This needs to be redone when we launch app to hotels/groups
  var customerType = "I"; //I: Individual, G: Group, H: Hotel etc

  firstName = req.body.firstName;
  lastName = req.body.lastName;
  userName = req.body.username;
  //password = req.body.password; // If social sign up, this won't be passed. Check logic below
  contact.phone1 = req.body.contact.phone1;
  contact.email1 = req.body.contact.email1;
  dob = req.body.dob;

  if(req.body.isFacebookAuthenticated || req.body.isGoogleAuthenticated){

    userName = req.body.social.name;

    isSocialSignUp = true;

    if(req.body.isFacebookAuthenticated){
      social.platform = "facebook";
    } else if(req.body.isGoogleAuthenticated){
      social.platform = "google";
    }

    // Setting up a fake password for social logins ( social name + platform )
    password = req.body.social.name + social.platform;

    social.socialLink = req.body.social.socialLink;
    social.name = req.body.social.name;
    social.gender = req.body.social.gender;
    social.currentCity = req.body.social.currentCity;
    social.currentCountry = req.body.social.currentCountry;

  } else {
    // User sends in password only when its not a social sign up
    password = req.body.password;

  }

  userService.getUserByUsername(userName, function (err, result) {
                if(err){
                  throw err;
                }

                console.log(result);

                if(result){
                  res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:null,
                    error:"Username already exist."
                  });

                } else{

                  userService.saveUser(
                    firstName,
                    lastName,
                    userName,
                    password,
                    contact,
                    dob,
                    customerLevel,
                    customerType,
                    isSocialSignUp,
                    social,
                    function (err,orders) {

                      if(err){
                        throw err;
                      }

                      res.json({
                        href:req.hostname + ":" + config.port + req.originalUrl,
                        data:orders
                      });

                    });

                }

  });


});

module.exports = router;