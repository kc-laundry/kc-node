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

var workerSchema = Schema({

});


//////////////////////////
// Export Schema
//////////////////////////

var Worker = mongoose.model('Worker',workerSchema,'workers');
module.exports.Worker = Worker;
