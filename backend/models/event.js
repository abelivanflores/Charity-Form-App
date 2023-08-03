//const uuid = require('uuid');
const mongoose = require("mongoose");
const { ObjectId } = require('bson');

const EventSchema = new mongoose.Schema({
  //_id: ObjectId,//{type: String, default: uuid.v1},
    name: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true,
    },
    
        street: { type: String,required: true},
        state: {type: String,required: true},
        city: {type: String,required: true},
        zip: {type: Number,required: true},
    
    
    date:{
        type: Date,
        required: true,
    },
  /*   UserID:{
    type: Number,
    required: true,
    index: true
    } */ 
    users: {
      type: [String]
    },
    EventAttended: [{type: mongoose.SchemaTypes.ObjectId, ref: 'user'}]

});

const Event = mongoose.model("event", EventSchema);

module.exports = Event;

//versionKey: false