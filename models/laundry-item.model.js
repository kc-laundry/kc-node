/**
 * Created by anasrazafirdousi on 3/1/17.
 */

//////////////////////////
// Requires
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

//////////////////////////
// Schema
//////////////////////////

var laundryItemSchema = Schema({
    categories : [ {
        type:ObjectId
    }],
    name : {
        type: String
    },
    rate : {
        wash : {
            type:Number
        },
        dryclean : {
            type:Number
        }
    },
    icon : {
        type:String
    },
    regionID : {
        type:ObjectId
    },
    isActive:{
        type: Boolean
    }

});


//////////////////////////
// Export Schema
//////////////////////////

var laundryItems = mongoose.model('laundryItems',laundryItemSchema,'laundryItems');
module.exports.laundryItems = laundryItems;
