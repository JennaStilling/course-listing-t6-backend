require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require("cors");

// Router to the routes !!!
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// added
var app = express();

// added
// var db = require("./models/course.models.js");
var db = require("./models");

// added
db.sequelize.sync();

// added
var corsOptions = {
  origin: "http://localhost:8081",
};

// Added
app.use(cors(corsOptions));
app.options("*", cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// simple route - added
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// added
require("./routes/course.routes.js")(app);

// Telling the app to use those routes declared above !!!
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
