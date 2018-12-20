'use strict'
var express = require('express');
var imgController = require('../controllers/fotos_avances');
const { verficarImgToken, verificarToken } = require('../server/middelwares/autenticacion');
var router = express.Router();

//middelware de subida de archivos
const fileUpload = require('express-fileupload');
var fileUploadMiddleware = fileUpload();

//se probara si funciona mandar dos middelware en un arreglo 
router.put('/saveImg', [fileUploadMiddleware, verificarToken], imgController.saveImg);
router.get('/getImgs', verificarToken, imgController.getImgs);
router.get('/getImg', verficarImgToken, imgController.getImg);
router.delete('/delFile/:nombre', verificarToken, imgController.delFile);

module.exports = router;