var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var utilService = require('../services/util.service');
var userService = require('../services/users.service');
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

router.post('/', function(req, res, next) {

    var userName = req.body.username;
    var password = req.body.password;
    var contact = {};

    contact.phone1 = req.body.contact.phone1;
    contact.email1 = req.body.contact.email1;
    var dob = req.body.dob;

    // Initialize customer to Bronze membership
    var customerLevel = "B"; //B : Bronze, S: Silver, G: Gold, P:Platinum

    //Initialize customer type to individual
    //TODO: This needs to be redone when we launch app to hotels/groups
    var customerType = "I"; //I: Individual, G: Group, H: Hotel etc

    var isActive = true;

    userService.saveUser(
                        userName,
                        password,
                        contact,
                        dob,
                        customerLevel,
                        customerType,
                        function (err,orders) {

                            if(err){
                                throw err;
                            }

                            res.json({
                                href:req.hostname + ":" + config.port + req.originalUrl,
                                data:orders
                            });

                         });
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

module.exports = router;
