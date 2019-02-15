const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UploadSchema = new Schema({
  title : {
    type : String,
    minlength : [ 4, 'Minimal input length is 4']
  },
  author : {
    type : String,
    minlength : [ 4, 'Minimal input length is 4']
  },
  pdfUrl : {
    type : String,
    required : true
  },
  userId : {type: Schema.Types.ObjectId, ref: 'User'}
})

let Upload = mongoose.model('Upload', UploadSchema)

module.exports = Upload