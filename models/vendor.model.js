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

var vendorSchema = Schema({

});


//////////////////////////
// Export Schema
//////////////////////////

var Vendor = mongoose.model('Vendor',vendorSchema,'vendors');
module.exports.Vendor = Vendor;
