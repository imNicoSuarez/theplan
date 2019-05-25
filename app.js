var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var models = require('./models/models');

var middlewares = require('./lib/middlewares')();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// API ROUTES
var apiUsers = require('./routes/api/users');
var apiClients = require('./routes/api/clients');
var apiSessions = require('./routes/api/sessions');
var apiTasks = require('./routes/api/tasks');
var apiPlanifications = require('./routes/api/planifications');
var apiPeoples = require('./routes/api/peoples');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(middlewares.crossOrigin);

app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next();
})


// Routes api define.
app.use('/api/users/auth', apiSessions);
app.use('/api/users', middlewares.autorization, apiUsers);
// app.use('/api/clients/new', middlewares.autorization, apiClients.private);
// app.use('/api/clients', apiClients.public);
app.use('/api/peoples', apiPeoples);
// app.use('/api/tasks', apiTasks);
// app.use('/api/planifications', apiPlanifications);
// -------------------


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
