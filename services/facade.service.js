// Facade Service holds all methods where more than one entity service call is required on a single route

/////////////////
//Requires
////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , objectId = Schema.Types.objectId;

var storiesService = require('orders.service.js');
var usersService = require('../services/users.service');
var Q = require('q');

////////////////////
//Export Utilities
///////////////////

module.exports = {

    hideStory: function (userID, storyID, callback) {

        // Step.1: Add to users document >> stories.hide
        usersService
            .hideStory(userID,storyID, function (err,userUpdateResult) {

                //Step.2: Add to stories document >> increment counter.hide +1
                storiesService
                    .hideStory(storyID, function (err,storyUpdateResult) {

                        var result = {
                            userUpdateResult:userUpdateResult,
                            storyUpdateResult:storyUpdateResult
                        };

                        callback(null,result);

                    });
            });

    },

    reportStory: function (userID, storyID, reportReasonID, callback) {

        // Step.1: Add to users document >> stories.report
        usersService
            .reportStory(userID,storyID,reportReasonID, function (err,userUpdateResult) {

                //Step.2: Add to stories document >> increment counter.report +1
                storiesService
                    .reportStory(storyID, function (err,storyUpdateResult) {

                        var result = {
                            userUpdateResult:userUpdateResult,
                            storyUpdateResult:storyUpdateResult
                        };

                        callback(null,result);

                    });
            });

        //TODO(anas): Enhancement: How to take care if dupes are reported, is it only depenedent on not showing these stories again? think!

    },

    reactToStory: function (userID, storyID, reactionCategoryID, reactionCategoryName, callback) {

        //Step:1
        usersService
            .reactToStory(userID,storyID,reactionCategoryID, function (err,userUpdateResult) {

                //Step.2:
                storiesService
                    .reactToStory(storyID, reactionCategoryID, reactionCategoryName,  function (err,storyUpdateResult) {

                        var result = {
                            userUpdateResult:userUpdateResult,
                            storyUpdateResult:storyUpdateResult
                        };

                        callback(null,result);

                    });

            });

        //TODO(anas) : Finalize how user activity history will be maintained for this scenario
    }

};
