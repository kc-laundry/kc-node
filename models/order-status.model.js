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

var orderStatusSchema = Schema({

});


//////////////////////////
// Export Schema
//////////////////////////

var OrderStatus = mongoose.model('OrderSchema',orderStatusSchema,'orderStatusTypes');
module.exports.OrderStatus = OrderStatus;
