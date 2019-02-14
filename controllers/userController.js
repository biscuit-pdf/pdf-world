const User = require('../models/user.js');
const hashPassword = require('../helpers/hashPassword.js');
const getJWT = require('../helpers/getJWT.js');
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
          res.status(200).json({
            token: getJWT(user, 'sign'), 
            userId: user._id, 
            userName: user._email});
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
        res.status(201).json(getJWT(user, 'sign'));
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }
}

module.exports = UserController;