'use strict'
var express = require('express');
var imgController = require('../controllers/fotos_avances');
var router = express.Router();

//middelware de subida de archivos
const fileUpload = require('express-fileupload');
var fileUploadMiddleware = fileUpload()

router.put('/saveImg', fileUploadMiddleware, imgController.saveImg);
router.get('/getImgs', imgController.getImgs);
router.get('/getImg', imgController.getImg);

module.exports = router;