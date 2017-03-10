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
var utilService = require('../services/util.service');
var orderService = require('../services/orders.service');
var _ = require('lodash');

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

        router.patch('/:ID/laundryItems', function (req, res, next) {

            var orderID = req.params.ID;
            var laundryItems = req.body.laundryItems;

            if(!_.isArray(laundryItems)){
                throw new Error('PATCH /orders/:/ID/laundryItems : laundyItems must be an array');
            }

            var propertiesToCheck = ['name','rate','count','toWash','toDry'];

            var incorrectStructure = false;
             _.forEach(laundryItems,function (item) {
                 if(!utilService.hasKeysDefined(propertiesToCheck, item)){
                     incorrectStructure  = true;
                 }
             });

            if(incorrectStructure){
                throw new Error('PATCH /orders/:/ID/laundryItems : '
                    + 'Each item in laundyItems array should have these properties define: '
                                                        + propertiesToCheck.join());
            }

            orderService.updateLaundryItems(orderID,laundryItems,function (err,result) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:result
                })

            });

        });

        router.patch('/:ID/service', function (req, res, next) {

            var orderID = req.params.ID;
            var services = req.body.services;
            orderService.updateServiceDetails(orderID,services,function (err,result) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:result
                })

            });
        });

        router.patch('/:ID/pickup', function (req, res, next) {

            var orderID = req.params.ID;
            var pickupLocation = req.body.pickupDetails.location;
            var pickupWhen = req.body.pickupDetails.when;
            var pikcupInstruction = req.body.pickupDetails.instruction;

            orderService.updatePickupDetails(orderID,pickupLocation,pickupWhen,pikcupInstruction,function (err,result) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:result
                })

            });

        });

        router.patch('/:ID/dropoff', function (req, res, next) {
            var orderID = req.params.ID;
            var dropoffLocation = req.body.dropoffDetails.location;
            var dropoffWhen = req.body.dropoffDetails.when;
            var dropoffInstruction = req.body.dropoffDetails.instruction;

            orderService.updateDropoffDetails(orderID,dropoffLocation,dropoffWhen,dropoffInstruction,function (err,result) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:result
                })

            });
        });


module.exports = router;
