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

var orderDetailsSchema = Schema({

});


//////////////////////////
// Export Schema
//////////////////////////

var OrderDetails = mongoose.model('OrderDetails',orderDetailsSchema,'orderDetails');
module.exports.OrderDetails = OrderDetails;
