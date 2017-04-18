var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var userService = require('../services/users.service');
var _ = require('lodash');

router.post('/forgot', function (req,res, next ) {

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


module.exports = router;