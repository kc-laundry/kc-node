/**
 * Created by anasrazafirdousi on 2/11/17.
 */
const utils = require('utility');
const _ = require('lodash');

module.exports = {

    hasKeysDefined: function (array, obj) {

        this.array  =array;
        this.obj  =obj;

        var testProps = function testProps(array, obj) {
            return array.reduce(function (bool, prop) {
                if (obj[prop] === undefined) return false;
                return bool;
            }, true);
        };

        return testProps;

    }
};