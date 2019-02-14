require('dotenv').config();

const { verify } = require('../helpers/getJWT');
const User = require('../models/user.js');

module.exports = {
  authentication: (req, res, next) => {

    // console.log('masuk')
    // const {data} = getJWT(req.headers.token, 'verify');
    // return User
    //   .findOne({
    //     email: data.email,
    //     password: data.password
    //   })
    //   .then(user => {
    //     if(!user){
    //       // console.log(req.headers.userid)
    //       res.status(400).json({err: `Invalid Token`});
    //     } else if(user._id != req.headers.userid) {
    //       res.status(400).json({err: `User Login Have Been Changed, Please Login Again`});
    //     } else {
    //       next();
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).json({err: err.message});
    //   })
    try {
      let decoded = verify(req.headers.token)
      console.log(decoded)
      req.headers.userid = decoded.id
      next()
    } catch(err) {
      res
        .status(400)
        .json({ message : `invalid token`})
    }
  },
}