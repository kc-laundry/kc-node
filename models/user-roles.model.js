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

var usersRolesSchema = Schema({

});


//////////////////////////
// Export Schema
//////////////////////////

var UserRoles = mongoose.model('UserRoles',usersRolesSchema,'userRoles');
module.exports.UserRoles = UserRoles;
