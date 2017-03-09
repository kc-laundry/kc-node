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

var userSchema = Schema({
    
});


//////////////////////////
// Export Schema
//////////////////////////

var User = mongoose.model('User',userSchema,'users');
module.exports.User = User;
