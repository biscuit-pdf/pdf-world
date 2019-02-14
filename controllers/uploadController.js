const Upload = require('../models/upload')
const User = require('../models/user')

class uploadController {
  static create(req, res) {
    
    let newUpload = null
    let input = {
      title : req.body.title,
      author : req.body.author
    }
    Upload.create(input)
      .then( function(upload) {
        newUpload = upload
        return User.findByIdAndUpdate(req.headers.userid, { $push : { uploads: upload }})
      })
      .then( function() {
        res
          .status(201)
          .json(newUpload)
      })
      .catch( function(err) {
        res
          .status(400)
          .json(err)
      })
  }
}

module.exports = uploadController
