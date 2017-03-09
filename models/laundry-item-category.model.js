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

var laundryItemCategories = Schema({

});


//////////////////////////
// Export Schema
//////////////////////////

var LaundryItemCategories = mongoose.model('LaundryItemCategories',laundryItemCategories,'laundryItemCategories');
module.exports.LaundryItemCategories = LaundryItemCategories;
