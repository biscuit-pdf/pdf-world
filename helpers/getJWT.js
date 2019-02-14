const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (data, method) => {
  if(method === 'sign'){
    return jwt.sign({ data }, process.env.JWT_SECRET);
  } else if(method === 'verify'){
    if(!data){
      return new Error('Please Login First');
    }
    return jwt.verify(data, process.env.JWT_SECRET);
  }
}
