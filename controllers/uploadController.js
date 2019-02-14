const Upload = require('../models/upload')
const User = require('../models/user')

class uploadController {
  static create(req, res) {
    
    console.log(req.file)
    console.log(req.body)
    let url = req.file ? req.file.cloudStoragePublicUrl : ''
    let newUpload = null
    let input = {
      title : req.body.title,
      author : req.body.author,
      pdfUrl : url,
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

  // createArticle: function(req, res) {

  //   let image = req.file ? req.file.cloudStoragePublicUrl : ''
  //   console.log(req.file)
  //   console.log(req.body)
  //   Article.create({
  //     title : req.body.title,
  //     content : req.body.content,
  //     image : image,
  //     created_at : new Date()
  //   })
  //     .then( function(newData) {
  //       res
  //         .status(201)
  //         .json(newData)
  //     })
  //     .catch( function(err) {
  //       res
  //         .status(400)
  //         .json(err)
  //     })
  // },
}

module.exports = uploadController
