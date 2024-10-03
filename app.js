require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require("cors");

// added
var app = express();

// added
// var db = require("./models/course.models.js");
var db = require("./models");

// added
db.sequelize.sync();

// added
// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));
// app.options("*", cors());

const cor = cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
});
app.use(cor);
app.options("*", cor);

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

// Router to the routes !!!
var coursesRouter = require('./routes/course.routes');

// Telling the app to use those routes declared above !!!


require("./routes/course.routes")(app)

module.exports = app;

const PORT = process.env.PORT || 3016;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

