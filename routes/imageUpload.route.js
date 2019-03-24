const express = require('express');
const router = express.Router();
const imageUploadController = require('../controllers/imageUpload.controller');

router.use(express.json());

// test route
router.get('/test', imageUploadController.test);

router.post('/upload', imageUploadController.upload);

router.get('/recentImages', imageUploadController.recentImages);

router.post('/marc', imageUploadController.receiveByteArray);

module.exports = router;