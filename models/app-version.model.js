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

var appVersion = Schema({
    currentVersion:{
        type:String
    },
    appName:{
        type:String
    },
    releaseDate:{
        type:String
    },
    history:[]
});


//////////////////////////
// Export Schema
//////////////////////////

var AppVersion = mongoose.model('AppVersion',appVersion,'appVersion');
module.exports.AppVersion = AppVersion;
