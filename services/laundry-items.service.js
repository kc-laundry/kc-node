/**
 * Created by anasrazafirdousi on 3/1/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');
var uuid = require('uuid'); // https://github.com/defunctzombie/node-uuid

// Models
var laundryItems = require('../models/laundry-item.model').laundryItems;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    // //////////////////
    // Common (Admin Tool & Consumer App)
    // //////////////////

    getLaundryItems : function (callback) {
        var query ={ "isActive": true };
        var projection ={ name:1, rate:1, icon:1 };
        laundryItems.find(query, projection, callback);
    },

    // //////////////////
    // Consumer App Only
    // //////////////////

    saveLaundryItems : function (callback, limit) {

    }

};
