var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var compression = require('compression');
var helmet = require('helmet');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

var app = express();


app.use(compression()); //Compress all routes

app.use(helmet()); //protect your app from well-known web vulnerabilities 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connecting to database  
//const mngDB="mongodb+srv://omar_sahin:07061989.Sa@cluster0.ahvby.mongodb.net/my_database?retryWrites=true&w=majority";
const mngDB= process.env.MONGODB_URI || 'mongodb://127.0.0.1/my_database';

mongoose.connect(mngDB,{useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect("mongodb://localhost:27017/my_database",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("error", function(err){
  console.log(`Error: ${err}`);
});

mongoose.connection.on("connected", function(err, res){
  console.log(`Mongoose connected`);
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
