/**
 * Created by anasrazafirdousi on 3/1/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');

// Models
var UserNotificationSettings = require('../models/user-notification.model').UserNotificationSettings;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    getSettings : function (userID, callback) {

      var query = { userID: userID };
      UserNotificationSettings.findOne(query, callback);

    },

    setSettings : function (userID, settings, callback) {

      var query = { userID: userID };
      console.log(settings);
      UserNotificationSettings.update(query, {$set: {'settings':settings}}, callback);

    }

};
