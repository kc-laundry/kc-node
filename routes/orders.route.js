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

        //First 25 records as default
        var defaultLimit = {
            "offset": 0,
            "limit": 25
        };

        var page = Object.keys(req.query).length?req.query:defaultLimit;

        orderService.getOrders(page, function (err,orders) {
            if(err){
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:orders
            })

        });

    });

    ///////////////////////
    // Single Order Routes
    ///////////////////////

        ///////////////////////
        // Single Order Detail Route
        ///////////////////////

        router.get('/:ID', function(req, res, next) {

            var orderID = req.params.ID;

            orderService.getOrder(orderID,function (err,orders) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:orders
                })

            })

        });

        router.post('/:ID', function(req, res, next) {

            var orderID = req.params.ID;

        });

        router.get('/pregen/order',function (req,res,next) {

            orderService.preGenerateOrder(function (err,pregeneratedOrder) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:pregeneratedOrder
                })

            });

        });

        ///////////////////////
        // Single Order  Focused Routes
        ///////////////////////

        router.patch(':/ID/location', function (req, res, next) {

        });

        router.patch(':/ID/service', function (req, res, next) {

        });

        router.patch(':/ID/pickup', function (req, res, next) {

        });

        router.patch(':/ID/dropoff', function (req, res, next) {

        });


module.exports = router;
