const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  sign: function(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
  },
  verify : function(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}