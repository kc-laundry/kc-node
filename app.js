var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash    = require('connect-flash');

var session = require('express-session');

var kcAuth = require('./auth/middleware');
var config = require('./config/dev.config.json');
var db = require('./db/db');
var index = require('./routes/index.route');
var users = require('./routes/users.route');
var signup = require('./routes/signup.route');
var orders = require('./routes/orders.route');
var laundryItems = require('./routes/laundry-items.route');
var appVersion = require('./routes/app-version.route');

var app = express();
var methodOverride = require('method-override');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'kclaundrylaundrykclaundry' })); // session secret
app.set('secret',config.secrets.session);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', index);
app.use('/api/v1/user/signup', signup);
app.use('/api/v1/auth', require('./auth'));

app.use(kcAuth());
app.use('/api/v1/orders', orders);
app.use('/api/v1/users', users);
app.use('/api/v1/laundryItems', laundryItems);
app.use('/api/v1/appVersion', appVersion);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
