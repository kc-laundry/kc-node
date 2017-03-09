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

var orderSchema = Schema({
    "userID" : {
        type:ObjectId
    },
    "workerID" : {
        type:ObjectId
    },
    "vendorID" : {
        type:ObjectId
    },
    "status" : [
        {
            "date" : {
                type:Date
            },
            "workerID" : {
                type:ObjectId
            },
            "statusTypeID" : {
                type:ObjectId
            },
            "message" : {
                type:String
            }
        }
    ],
    "expectedDeliveryDate" : {
        type:Date
    },
    "totalAmount" : {
        type:Number
    },
    "paidAmount" : {
        type:Number
    },
    "isActive" : {
        type:Boolean
    },
    "details":{
        "laundryItems" : [],
        "services" : [ {
            type:String
        }],
        "pickup" : {
            "location":String,
            "when":Date
        },
        "dropoff" : {
            "location":String,
            "when":Date
        }
    }

});


//////////////////////////
// Export Schema
//////////////////////////

var Order = mongoose.model('Order',orderSchema,'orders');
module.exports.Order = Order;
