'use strict'
var express = require('express');
var imgController = require('../controllers/fotos_avances');
const { verficarImgToken } = require('../server/middelwares/autenticacion');
var router = express.Router();

//middelware de subida de archivos
const fileUpload = require('express-fileupload');
var fileUploadMiddleware = fileUpload()

router.put('/saveImg', fileUploadMiddleware, imgController.saveImg);
router.get('/getImgs', imgController.getImgs);
router.get('/getImg', verficarImgToken, imgController.getImg);
router.delete('/delFile/:nombre', imgController.delFile);

module.exports = router;