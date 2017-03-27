/**
 * Created by anasrazafirdousi on 2/11/17.
 */
const utils = require('utility');
const _ = require('lodash');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'kc*laundry*secret';

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

    },

    encrypt: function(text){
      var cipher = crypto.createCipher(algorithm,password);
      var crypted = cipher.update(text,'utf8','hex');
      crypted += cipher.final('hex');
      return crypted;
    },

    decrypt: function(text){
      var decipher = crypto.createDecipher(algorithm,password);
      var dec = decipher.update(text,'hex','utf8');
      dec += decipher.final('utf8');
      return dec;
    }
};