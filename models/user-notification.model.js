/**
 * Created by anasrazafirdousi on 3/27/17.
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

var userNotificationSchema = Schema({
  userID:{
    type:ObjectId
  },
  settings:{
    generalNotification:{
      type:Boolean
    },
    orderNotification:{
      type:Boolean
    },
    emailNotification:{
      type:Boolean
    },
    promoNotification:{
      type:Boolean
    }
  }
});


//////////////////////////
// Export Schema
//////////////////////////

var UserNotificationSettings = mongoose.model('UserNotificationSettings',userNotificationSchema,'userNotificationSettings');
module.exports.UserNotificationSettings = UserNotificationSettings;
