//const uuid = require('uuid');
const { ObjectId } = require("bson");
const mongoose = require("mongoose");
//const { ObjectId } = require('bson');
//test

const LogSchema = new mongoose.Schema({
  _id: ObjectId,
  
 UserID: ObjectId,
 EventID: ObjectId,
   
  //},
      
     //EventsAttended1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'event'}]

});
 
const Log = mongoose.model("log", LogSchema);

module.exports = Log;

//versionKey: false