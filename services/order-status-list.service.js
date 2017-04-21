
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.Types.ObjectId;

// Models
var OrderStatus = require('../models/order-status.model').OrderStatus;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports = {

    getStatusList: function (callback) {
        OrderStatus.find({}, callback);
    }

};