/**
 * Created by anasrazafirdousi on 3/1/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');
var nodemailer = require('nodemailer');
var utilService = require('./util.service');

// Models
var User = require('../models/user.model').User;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    getUsers : function (callback) {

        User.find({},callback);
    },

    getUser : function (userID,callback) {
        var query = { _id: userID};
        User.findOne(query,callback);
    },

    saveUser : function (username, password, contact, dob, customerLevel,customerType, callback) {

       var query = {
            userName: username,
            password: utilService.encrypt(password),
            facebookName:"",
            contact:{
                phone1:contact.phone1,
                phone2:"",
                email1:contact.email1,
                email2:"",
                address:[]
            },
            dob:dob,
            customerLevel:customerLevel,
            customerType:customerType,
            isActive:true
        };

       User.create(query, callback);

    },

    updateUser :  function (user, callback) {

    },

    addAddress: function (userID, alias, address, lat, long, callback) {

            var query = { _id: userID };
            var update ={
                $push: {
                    'contact.address':{
                        alias:alias,
                        address:address,
                        lat:lat,
                        long:long,
                        isActive:true
                    }
                }
            };

            User.update(query, update, callback);
    },

    getAddresses : function (userID, callback) {

        var query = { _id: userID};
        var projection = { _id:1, userName:1, 'contact.address':1 };

        User.findOne(query, projection, callback);
    },

    addComplain: function (userID, complain, dateTime, callback) {

      User.findByIdAndUpdate(
        userID,
        {$push: {"complains": {complain: complain, dateTime: dateTime, isActive: true}}},
        {safe: true, upsert: true, new : true},
        callback
      );

    },

    getComplains: function (userID, callback) {

      console.log('getComplains():',userID);
      var query = { _id: userID };
      var projection = { _id:0, complains: 1 };

      User.find(query, projection, callback);
    },

    forgotPassword: function (userID, callback) {

      var query = { _id: userID};
      var projection = { firstName:1 , userName:1, password: 1, 'contact.email1':1, 'contact.email2':1};
      User.findOne(query, projection ,function (err,userDetails) {

        var password = utilService.decrypt(userDetails.password);
        var emailTo = userDetails.contact.email1 || userDetails.contact.email2;

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://PUT_EMAIL_HERE:PUT_PASSWORD_HERE@smtp.gmail.com');

        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: '"KC Laundry" <kclaundry9@gmail.com>', // sender address
          to: emailTo,  // list of receivers ( just separate addresses with comma)
          subject: 'Your Password', // Subject line
          text: 'Hello world ?', // plaintext body
          html: 'Dear ' + userDetails.firstName +  ', You recently requested to change your KC Laundry App password. ' +
          '<br>Your current password is <b>' + password + '</b>' +
          '<br><br>Team,<br>KC Laundry - UAE'// html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            return console.log(error);
          }
          //console.log('Message sent: ' + info.response);
          callback(null,{emailSent:true, emailTo:userDetails.email1, response:info.response});
        });



      });

    },

    updatePassword: function (userID, newPassword, callback) {

      var encrptedPassword  = utilService.encrypt(newPassword);

      User.findByIdAndUpdate(
        userID,
        {$set: {"password": encrptedPassword }},
        callback
      );
    }

};