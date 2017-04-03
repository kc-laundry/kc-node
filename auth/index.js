var express = require('express');
var passport = require('passport');
var appConfig = require('../config/dev.config.json');
var authConfig = require('./auth.config');
var User = require('../models/user.model').User;

// Passport Configuration
require('./local/passport.js').setup(User, authConfig);
require('./facebook/passport.js').setup(User, authConfig);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));

module.exports = router;