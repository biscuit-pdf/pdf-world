const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (data, method) => {
  if(method === 'sign'){
    console.log(data);
    return jwt.sign({ data }, process.env.JWT_SECRET);
  } else if(method === 'verify'){
    console.log(data)
    return jwt.verify(data, process.env.JWT_SECRET);
  }
}
