var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var userService = require('../services/users.service');
var _ = require('lodash');

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

module.exports = router;