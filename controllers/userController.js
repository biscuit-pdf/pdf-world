const User = require('../models/user.js');
const hashPassword = require('../helpers/hashPassword.js');
const { sign, verify } = require('../helpers/getJWT');
require('dotenv').config();


class UserController {
  static signin(req,res){
    User
      .findOne({
        email: req.body.email,
        password: hashPassword(req.body.password)
      })
      .then(user => {
        if(user){
          let obj = {
            id : user._id,
            name : user.name,
            email : user.email
          }

          let token = sign(obj)

          res.status(200).json({ token: token });
        } else {
          res.status(400).json({err: 'Wrong Username/Password'});
        }
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

  static signup(req, res){
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password)
      })
      .then(user => {
        let obj = {
          id : user._id,
          name : user.name,
          email : user.email
        }
        res.status(201).json({token : sign(obj) });
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

}

module.exports = UserController;