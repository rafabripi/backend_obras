'use strict'
var express = require('express');
var imgController = require('../controllers/fotos_avances');
var router = express.Router();

//middelware de subida de archivos
const fileUpload = require('express-fileupload');
var fileUploadMiddleware = fileUpload()

router.put('/saveImg', fileUploadMiddleware, imgController.saveImg);
router.get('/getImg/:clave/:checklist', imgController.getImg);

module.exports = router;