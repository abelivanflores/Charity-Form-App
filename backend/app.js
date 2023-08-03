const express = require('express'); //import package
const mongoose = require('mongoose'); //require mongoose library
//adding better logging functionality
const morgan = require("morgan");
//const bodyParser = require('body-parser'); //parses our request
const app = express(); //execute package
const cors = require('cors')

//middlewares functions that execute when routes are being used

require("dotenv").config();// Require the dotenv for zero-dependency module the loads
//enviornment variable from a .env file.

//import the User model schema from another file
let UserModel = require('./models/user');

let EventModel = require('./models/event');
const event = require('./models/event');
const user = require('./models/user');

//settings up mongoose DB connection
mongoose
    .connect(process.env.MONGO_URL) //read from enviroment variable from .env
    .then(() => {
        console.log("Database connection Successful!");
    })
    .catch((err) => {
        console.log.error("Mongo Connection Error",err);
    });

const PORT = process.env.PORT || 3000; // set up the post number

app.use(express.json()); // lets us access request body as res.body
app.use(morgan("dev")); // enable incoming request loggin in dev mode
app.use(cors());//middleware


//create an endpoint for the index or home page
app.get('/', (req,res) =>
//index.html page for later refers as homepage
res.send('Hello to Bread of Life Project 42!'));


//Routes

//create an endpoint to get all users from the API
app.get('/get_all_users', (req,res,next) => {
    //simple way to get all the data from the collection using mongoose schema
    UserModel.find((error,data)=>{
        if (error) {
            //a call to next() to send an error message
            return next (error)
        } else {
            res.json(data)
        }
    })
});



//end point that will create user document

app.post('/new_user',(req,res, next)=> {
    UserModel.create(req.body, (error,data)=>{
        if (error){
            return next(error)
        }else {
            //res.json(data)
            res.send('User is added to the database');
        }

    })
});

//endpoint for retrieving user by user id
//example http://localhost:3000/user/99
app.get('/find_user_by__id/:id', (req,res,next)=>{
    console.log(req.params.id)

    UserModel.findOne({_id: req.params.id}, (error,data)=>{
        if (error){
            return next(error)
        } else if (data === null){
        //sending 404
        res.status(404).send('User not found');
        }
        else {
            res.json(data)
        }
    });
});




//find

// Project Manager and events:

//get all events from db
app.get('/get_all_events', (req,res, next)=>{
    EventModel.find((error,data)=> {
        if (error){
            return next (error)
        } else {
            res.json(data)
        }
    })

});

//post a new event to db
app.post('/new_event', (req,res,next) => {

    EventModel.create(req.body, (error,data)=>{
        if (error){
            return next (error)
        }else{
            //res.json(data)
            res.send('Event is added to the database')
        }
    })
});
//get events by type
//example http://localhost:3000/events/Disaster%20Relief
//example http://localhost:3000/events/Disaster_Relief
app.get('/type_of_events/:type', (req,res,next)=>{
    console.log(req.params.type)

    EventModel.findOne({type: req.params.type}, (error,data)=>{
        if (error){
            return next(error)
        } else if (data === null){

        //sending 404


        res.status(404).send('Location based on type not found');
         main

        }
        else {
            res.json(data)
        }
    });
});





app.get('/users_events_attended/:_id',(req,res, next)=>{
    UserModel.aggregate([
        {$match: {_id: req.params._id}},
        {$project: {_id: 1, name: 1}},
        {$lookup:{
            from: 'users',
            localField: 'EventsAttended',
            foreignField: '_id',
            as: 'users_info'
        }}]
        ,
         (error, data) => {
            if (error) {
              return next(error)
            } else {
              res.json(data);
            }
        }
        
)})
app.get('/users_list_events_attended/:name',(req,res, next)=>{
    EventModel.aggregate([
        {$match: {name: req.params.name}},
        {$project: {_id: 1, name: 1, fname:1}},
        {$lookup:{
            from: 'users',
            localField: 'name',
            foreignField: 'name',
            as: 'results'
        }
    }
    
]
        ,
         (error, data) => {
            if (error) {
              return next(error)
            } else {
              res.json(data);
            }
        }
        
)})
//get users by senior households
  app.get('/users_senior/', (req, res, next) => {


    UserModel.aggregate([
        {$match: {seniorCheck: {$eq: true}}},
        {$count:"how_many_senior_households"}
    ]

    , (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
  });

/* 
app.patch('/patch_update_event/:id', async (req, res) => {

        try{
            var updateObject = req.body;
            const updateEvent = await EventModel.updateOne({_id: req.params.id}, {$set: updateObject})
            res.json(updateEvent)
        }catch(err){
            res.json({message:err});
        }
    }); */
app.patch('/patch_update_event/:id', async (req, res) => {

            try{
                var updateObject = req.body;
                const updateEvent = await EventModel.updateOne({_id: req.params.id}, {$set: updateObject})
                res.json(updateEvent)
            }catch(err){
                res.json({message:err});
            }
        });


app.patch('/patch_update_user/:id', async (req, res) => {

            try{
                var updateObject = req.body;
                const updateUser = await UserModel.updateOne({_id: req.params.id}, {$set: updateObject})
                res.json(updateUser)
            }catch(err){
                res.json({message:err});
            }
        });



/* 
app.put('/put_update_user/:_id', (req, res, next) => {
        const findUpdate = UserModel.findOneAndUpdate({ _id: req.params._id }, {
            $set: req.body
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.send('User is edited via Put');
              res.json(findUpdate)
              console.log('User successfully updated!', data)
            }
          })
    });   */ 
    
    app.put('/put_update_event/:id', (req, res, next) => {
        EventModel.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.send('Event is edited via PUT');
              console.log('Event successfully updated!', data)
            }
          })
    });   

//searches events by type
//sends error if no type was find matching the input
//runs a test to check if the attendees added 
//are 
    app.get('/events-by-type/:type', (req,res, next) => {
        EventModel.find({type: req.params.type},(error,data)=>{
            if (error){
                return next(error)
            }else if (!data.length){
            res.status(404).send('No events with that type found');
            }
            else{
            var allData = data;
            allData.forEach(function(data){
                var test = data.users;
                test.forEach(function(userName){
                    UserModel.find({fullName: userName}, (error, data) => {
                       if (error)
                        return next(error)
                    else
                    data.forEach(function(user){
                        console.log(user)
                    })
                });	
            });
        });
        res.status(200).send('Success');
        }
        });
    });
//    

app.put('/event-attendee', (req,res, next) => {
        EventModel.findOneAndUpdate({_id: req.body._id},
            {$push: {users: req.body.fullName}},(error,data)=>{
            if (error){
                return next(error)
            }else{
            res.json(data);
            }
    });
});








//getting all events by zip code
//postman: localhost:3000/events/location/77099
//json:
app.get('/find_events/:zip', async (req,res) => {
    try{
        const eventByZip = await EventModel.find({"zip": req.params.zip})
        res.json(eventByZip)
    }catch(err){
        res.json({message:err});
    }
});

//finding events by id
app.get('/find_event_by_id/:id', async (req,res) => {
    try{
        const eventByID = await EventModel.find({_id: req.params.id})
        res.json(eventByID)
    }catch(err){
        res.json({message:err});
    }
});

//deleting event by ID
app.delete('/delete_events/:id', async (req,res) => {
    try{
        const removedEvent = await EventModel.deleteOne({_id: req.params.id})
        res.json(removedEvent)
    }catch(err){
        res.json({message:err});
    }

});

// delete -> delete user by ID
app.delete('/delete_users/:id', async (req,res) => {
    try{
        const removedUser = await UserModel.deleteOne({_id: req.params.id})


        res.json(removedUser)
    }catch(err){
        res.json({message:err});
    }

});


  //endpoint that will get the number of users that have more than 2 child
app.get('/users_more_than_2_children', (req, res, next) => {
 UserModel.aggregate(
      [
          {
              $match: {
                  numChildren: {
                      $gt:2
                  }
              }
          },
          {
              $count: "More_than_2_child "
          }
      ]
      , (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
  });

  //endpoint to see how many people dont want the vax
  app.get('/users_vax/', (req, res, next) => {


    UserModel.aggregate([
        {$match: {vaxRequest: {$eq: "none"}}},
        {$count:"how_many_do_not_request_a_vaccination"}
    ]

    , (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
  });


// endpoint that will retrieve zip by user name 
//
app.get('/users_near_by/:zip', (req, res, next) => {


    UserModel.aggregate([
      { $match : { zip : req.params.zip } },
      { $project : { _id : 0, name : 1, phone : 1, } },
      { $lookup : {
          from : 'events',
          localField : 'zip',
          foreignField : 'zip',
          as : 'grades'
      } }
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
  });


//app.patch //patch -> for updates

 //show last 3 events for making a form
app.get('/events_lastest_three', (req, res, next) => {

    EventModel.aggregate([
        {$sort: {date: -1}},
        {$limit: 3 }
    ]
   ,(error, data) => {
        if (error) {
          return next(error)
        } else {
          return res.json(data);
        }}
    );
  });





//connect to DB

//error handler
app.use(function (err,req,res,next){
    console.error(err.message)
})

//
//How do we start listening to the server aka start up the server
app.listen(PORT,() => {
    console.log("Server started listening on port :", PORT);
});
