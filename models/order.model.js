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

});


//////////////////////////
// Export Schema
//////////////////////////

var Order = mongoose.model('Order',orderSchema,'order');
module.exports.Order = Order;
