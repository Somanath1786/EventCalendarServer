var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema for events
var schema = new Schema({
    _id : String,
    title : {
        type : String,
        required : true
    },
    start : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    },
    building : {
        type : String,
        required : true
    },
    event_type : {
        type : String,
        required : true
    },
    vp : {
        type :  String,
        required : true
    },
    designated_charity : {
        type : String
    },
    registration_link : {
        type : String
    }
},
{
    timestamps : { createdAt: 'created_at', updatedAt : 'updated_at' }
});

module.exports = mongoose.model('GiveEvents', schema)