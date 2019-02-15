const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')
const uploadController = require('../controllers/uploadController')

router.post('/', upload.multer.single('file'), upload.sendUploadToGCS, uploadController.create);

module.exports = router;