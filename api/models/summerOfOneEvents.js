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
    location : {
        type : String,
        required : true
    },
    comments : {
        type : String
    }
},
{
    timestamps : { createdAt: 'created_at', updatedAt : 'updated_at' }
});

module.exports = mongoose.model('SummerOfOneEvents', schema)