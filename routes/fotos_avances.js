'use strict'
var express = require('express');
var imgController = require('../controllers/fotos_avances');
const { verificarToken } = require('../server/middelwares/autenticacion');
var router = express.Router();

//middelware de subida de archivos
const fileUpload = require('express-fileupload');
var fileUploadMiddleware = fileUpload();

// Poner token en get de imagenes  
router.put('/saveImg', [fileUploadMiddleware, verificarToken], imgController.saveImg);
router.get('/getImgs', verificarToken, imgController.getImgs);
router.get('/getImg', imgController.getImg);
router.delete('/delFile', verificarToken, imgController.delFile);

module.exports = router;