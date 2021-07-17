//Import the mongoose module
var mongoose=require('mongoose');

//Set up default mongoose connection
var mongoDB='mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db=mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB conection error'));

module.exports=db;