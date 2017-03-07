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
var orderService = require('../services/orders.service');


///////////////////////
// Variables
///////////////////////


///////////////////////
// Routes
///////////////////////


    ///////////////////////
    // Multiple Order Routes
    ///////////////////////

    router.get('/', function(req, res, next) {

        var orders = [
            {
                id:1
            },
            {
                id:2
            }
        ];

        res.send({
            data: orders
        });

    });

    ///////////////////////
    // Single Order Routes
    ///////////////////////

        ///////////////////////
        // Single Order Detail Route
        ///////////////////////

        router.get('/:ID', function(req, res, next) {

        });

        router.post('/:ID', function(req, res, next) {

        });

        router.get('/pregen/order',function (req,res,next) {

        });

        ///////////////////////
        // Single Order  Focused Routes
        ///////////////////////



module.exports = router;
