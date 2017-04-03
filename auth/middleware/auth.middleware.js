var config = require('../../config/dev.config.json');
var jwt = require('jsonwebtoken');

module.exports = function auth() {

  return function(req, res, next) {
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decode token
      if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secrets.session, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });

      } else {

        // if there is no token
        // return an error
        return res.status(403).send({
          success: false,
          message: 'Unauthenticated API call. No token provided.'
        });

      }
    };
};
