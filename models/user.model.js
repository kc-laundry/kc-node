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

var customerAddress = new Schema({
    alias:{
        type:String
    },
    address:{
        type:String
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    isActive:{
        type:Boolean
    }
});

var customerComplain = new Schema({
  complain:{
    type: String
  },
  date:{
    type:Date
  },
  isActive:{
    type:Boolean
  }
});

var userSchema = Schema({
    firstName:{
        type:String
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String
    },
    userName:{
        type:String
    },
    password:{
        type:String
    },
    facebookName:{
        type:String
    },
    contact:{
        phone1:{
            type:String
        },
        phone2:{
            type:String
        },
        email1:{
            type:String
        },
        email2:{
            type:String
        },
        address:[customerAddress]
    },
    dob:{
        type:String
    },
    customerLevel:{
        type:String
    },
    customerType:{
        type:String
    },
    complains:[customerComplain],
    isActive:{
        type:Boolean
    }

});


//////////////////////////
// Export Schema
//////////////////////////

var User = mongoose.model('User',userSchema,'users');
module.exports.User = User;
