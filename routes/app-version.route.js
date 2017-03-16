var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var utilService = require('../services/util.service');
var appVersionService = require('../services/app-version.service');
var _ = require('lodash');

router.get('/current', function(req, res, next) {

    appVersionService.getCurrent(function (err,currentVersion) {
        if(err){
            throw err;
        }

        res.json({
            href:req.hostname + ":" + config.port + req.originalUrl,
            data:currentVersion
        })

    })
});


module.exports = router;
