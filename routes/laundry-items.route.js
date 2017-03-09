/**
 * Created by anasrazafirdousi on 3/1/17.
 */

///////////////////////
// Require
///////////////////////

var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config/dev.config.json');
var laundryItemService = require('../services/laundry-items.service');


///////////////////////
// Variables
///////////////////////


///////////////////////
// Routes
///////////////////////


    ///////////////////////
    // Multiple Laundry Item Routes
    ///////////////////////

    router.get('/', function(req, res, next) {

        laundryItemService.getLaundryItems(function (err,laundryItems) {
            if(err){
                throw err;
            }

            res.send({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data: laundryItems
            });
        });
    });

module.exports = router;
