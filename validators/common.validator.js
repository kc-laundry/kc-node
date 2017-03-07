/**
 * Created by anasrazafirdousi on 2/22/17.
 */
const _ = require('lodash');

module.exports = {

    validatePagination: function (page) {

        console.log(page);
        var hasOffset, isValidOffset, hasLimit, isValidLimit;

        hasOffset = _.has(page,'offset');
        if(!hasOffset){
            throw new Error(" 'offset' property is required for getting paged results. ");
        }

        if(hasOffset){
            var offset = parseInt(page.offset);
            if(offset<0){
                throw new Error(" 'offset' can only be equal to or greater than 0 for getting paged results. ");
            }else{
                isValidOffset = true;
            }
        }


        hasLimit = _.has(page,'limit');
        if(!hasLimit){
            throw new Error(" 'limit' property is required for getting paged results. ");
        }

        if(hasLimit){
            var limit = parseInt(page.limit);
            if(limit<0 || limit>50){
                throw new Error(" 'limit' can be between 0 to 50. Invalid limit passed");
            }else{
                isValidLimit = true;
            }
        }

        if(hasOffset && isValidOffset && hasLimit && isValidLimit){
            return true;
        }else{
            return false;
        }
    }

};