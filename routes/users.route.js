var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var utilService = require('../services/util.service');
var userService = require('../services/users.service');
var userNotifications = require('../services/userNotifications.service');
var _ = require('lodash');

router.get('/', function(req, res, next) {

    userService.getUsers(function (err,users) {
        if(err){
            throw err;
        }

        res.json({
            href:req.hostname + ":" + config.port + req.originalUrl,
            data:users
        })

    })
});

router.get('/:ID', function(req, res, next) {
    var userID = req.params.ID;
    console.log(userID);

    userService.getUser(userID,function (err,user) {
        if(err){
            throw err;
        }

        res.json({
            href:req.hostname + ":" + config.port + req.originalUrl,
            data:user
        })

    })
});

router.get('/:ID/addresses', function(req, res, next) {
    var userID = req.params.ID;

    userService.getAddresses(userID,function (err,addressList) {
        if(err){
            throw err;
        }

        res.json({
            href:req.hostname + ":" + config.port + req.originalUrl,
            data:addressList
        })

    })
});

router.patch('/:ID/address', function(req, res, next) {

    var userID = req.params.ID;

    var alias = req.body.alias;
    var address = req.body.address;
    var lat = req.body.lat;
    var long = req.body.long;

    userService.addAddress(userID, alias, address, lat, long, function (err,orders) {

            if(err){
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:orders
            });

        });
});

// Used for both complain & suggestions
router.get('/:ID/complains', function(req, res, next) {

  var userID = req.params.ID;
  console.log(userID);
  userService.getComplains(userID, function (err,complains) {



    if(err){
      throw err;
    }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:complains
    });

  });
});

router.patch('/:ID/complain', function(req, res, next) {

  var userID = req.params.ID;

  var complain = req.body.complain;
  var dateTime = req.body.dateTime;

  console.log(userID, complain, dateTime);

  userService.addComplain(userID, complain, dateTime, function (err,orders) {

    if(err){
      throw err;
    }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:orders
    });

  });
});

router.get('/:ID/notificationSettings', function(req, res, next) {

  var userID = req.params.ID;
  userNotifications.getSettings(userID, function (err,settings) {

    if(err){
      throw err;
    }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:settings
    });

  });
});

router.put('/:ID/notificationSettings', function(req, res, next) {

  var userID = req.params.ID;
  var settings = req.body.settings;
  userNotifications.setSettings(userID, settings, function (err,settings) {

    if(err){
      throw err;
    }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:settings
    });

  });
});

//TODO:This is deprecated. Remove it.
router.get('/:ID/password/forgot', function (req,res, next ) {

  var userID = req.params.ID;
  userService.forgotPassword(userID,function (err, emailStatus) {
    if(err){
      throw err;
    }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:emailStatus
    });

  });

});

//TODO:This is deprecated. Remove it. This has been to password.route.js
router.post('/password/forgot', function (req,res, next ) {

  var emailID = req.body.emailID;
  userService.forgotPasswordRecoverByEmail(emailID,function (err, emailStatus) {
    // if(err){
    //   throw err;
    // }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:emailStatus || err
    });

  });

});

router.patch('/:ID/password/update',function (req,res, next ) {

  var userID = req.params.ID;
  var newPassword = req.body.newPassword;

  userService.updatePassword(userID, newPassword ,function (err, passwordStatus) {
    if(err){
      throw err;
    }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:passwordStatus
    });

  });

});

router.get('/:ID/profile', function (req,res, next) {
  var userID = req.params.ID;
  userService.getUserProfile(userID, function (err,settings) {

    if(err){
      throw err;
    }

    res.json({
      href:req.hostname + ":" + config.port + req.originalUrl,
      data:settings
    });

  });
});

router.put('/:ID/profile', function (req,res, next) {
  var userID = req.params.ID;

  var firstName = req.body.firstName;
  var middleName = req.body.middleName;
  var lastName = req.body.lastName;
  var phone1 = req.body.contact.phone1;
  var phone2 = req.body.contact.phone2;
  var email1 = req.body.contact.email1;
  var currentCity = req.body.currentCity;
  var currentCountry = req.body.currentCountry;

  userService.setUserProfile( userID,
                              firstName,
                              middleName,
                              lastName,
                              phone1,
                              phone2,
                              email1,
                              currentCity,
                              currentCountry, function (err,settings) {

                                                    if(err){
                                                      throw err;
                                                    }

                                                    res.json({
                                                      href:req.hostname + ":" + config.port + req.originalUrl,
                                                      data:settings
                                                    });

                                              });

});

module.exports = router;
