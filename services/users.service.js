/**
 * Created by anasrazafirdousi on 3/1/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');

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
            password:password,
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

       console.log(query);

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
    }


};
