//const uuid = require('uuid');
const { ObjectId } = require("bson");
const mongoose = require("mongoose");
//const { ObjectId } = require('bson');
//test
const UserSchema = new mongoose.Schema({
  //_id: ObjectId,
/*   fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  }, */
  fullName:{
    type:String,
    unique: true,
    required: true

  },
  phone: {
    type: String
  },
  marketing: {            //How did you hear about us? (Facebook, insta, twitter, other)
   type: String, //incorrect
   enum: ['facebook','instagram','twitter','other','Facebook','Instagram','Twitter','Other']
  },
  vaxRequest: {
    type: String, //moderna, pzier, none Pzier 2 and Moderna 2 for second dose
    enum: ["moderna","Moderna", "moderna 2", "Moderna 2","Pfizer","pfizer ","Pfizer 2","pfizer 2",
    "None","none"],
  },
  serviceplusRequest: {
    type: String
  },
  numChildren: {
    type: Number,
    default: 0,
  },
  seniorCheck: {  //65+ in the house?
    type: String
  },
  vetCheck: {  //Veteran?
    type: String
  },
  ethnicRequest: {  // what is your race? (white, asian, black, hispanic,other)
    type: String,
     enum: ['Asian','Black','Hispanic','Native American','White','Multiracial','Other',
    'asian','black','hispanic','native american','multiracial','other']
  },
  zip:
  {
    type: Number,
    required: true
  },
      
  EventsAttended: [{ type: mongoose.Types.ObjectId, ref: 'event' }] 

});
 
//module.exports = mongoose.model("user",UserSchema);
const User = mongoose.model("user", UserSchema);

module.exports = User;

//versionKey: false