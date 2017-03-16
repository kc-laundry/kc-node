/**
 * Created by anasrazafirdousi on 3/1/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

// Models
var appVersion = require('../models/app-version.model').AppVersion;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    // //////////////////
    // Common (Admin Tool & Consumer App)
    // //////////////////

    getCurrent : function (callback) {
        var projection ={ currentVersion:1, appName:1, releaseDate:1};
        appVersion.findOne({},projection, callback);
    }

};
