/**
 * Created by anasrazafirdousi on 3/1/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');
var uuid = require('uuid'); // https://github.com/defunctzombie/node-uuid
var moment = require('moment');

// Models
var Order = require('../models/order.model').Order;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    // //////////////////
    // Common (Admin Tool & Consumer App)
    // //////////////////

    getOrders : function (page,callback) {

        var isValidPagination = commonValidator.validatePagination(page);

        if(isValidPagination){
            Order.find({},callback).skip(parseInt(page.offset)).limit(parseInt(page.limit));
        }

    },
    getOrder : function (orderID,callback) {
        var query = { _id: orderID};
        Order.findOne(query,callback);
    },

    // //////////////////
    // Admin Tool Only
    // //////////////////

    getOrderByCustomer : function (customerID, callback) {

    },

    // //////////////////
    // Consumer App Only
    // //////////////////

    saveOrder : function (callback, limit) {

    },
    preGenerateOrder : function (callback) {

        var query = {
            "status" : [],
            "expectedDeliveryDate" : moment().utc().add('days',3),
            "totalAmount" : 2,
            "paidAmount" : 0,
            "isActive" : true,
            "details":{
                "laundryItems" : [ ],
                "services" : [ ],
                "location" : {
                    "pickup" : "",
                    "dropoff" : ""
                }
            }

        };

        Order.create(query,callback);

    }

};
