/**
 * Created by anasrazafirdousi on 3/1/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');
var uuid = require('uuid'); // https://github.com/defunctzombie/node-uuid

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

    },
    getOrder : function (orderID,callback) {

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

    }

};
