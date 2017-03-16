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
            "location":{
                "lat":{
                    type:String
                },
                "long":{
                    type:String
                },
                "address":{
                    type:String
                }
            },
            "when":{
                type:String
            },
            "instruction":{
                type:String
            }
        },
        "dropoff" : {
            "location":{
                "lat":{
                    type:String
                },
                "long":{
                    type:String
                },
                "address":{
                    type:String
                }
            },
            "when":{
                type:String
            },
            "instruction":{
                type:String
            }
        },
        "laundryInstruction":{
            type:String
        },
        "drycleanInstruction":{
            type:String
        }
    }

});


//////////////////////////
// Export Schema
//////////////////////////

var Order = mongoose.model('Order',orderSchema,'orders');
module.exports.Order = Order;
