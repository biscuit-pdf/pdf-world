require('dotenv').config();

const getJWT = require('../helpers/getJWT.js');
const User = require('../models/user.js');

module.exports = {
  authentication: (req, res, next) => {
    
    const {data} = getJWT(req.headers.token, 'verify');
    return User
      .findOne({
        email: data.email,
        password: data.password
      })  
      .then(user => {
        if(!user){
          res.status(400).json({err: `Invalid Token`});
        } else if(user._id != req.headers.userid) {
          res.status(400).json({err: `User Login Have Been Changed, Please Login Again`});
        } else {
          next();
        }
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }
}