const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')
const uploadController = require('../controllers/uploadController')

router.get('/getfile', uploadController.getAllFile);
router.post('/', upload.multer.single('file'), upload.sendUploadToGCS, uploadController.create);

module.exports = router;