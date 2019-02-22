'use strict'
var express = require ('express');
var PdfController = require ('../controllers/pdfs');
var router = express.Router();
const { verificarToken } = require('../server/middelwares/autenticacion');

//middelware de subida de archivos
const fileUpload = require('express-fileupload');
var fileUploadMiddleware = fileUpload();

//se probara si funciona mandar dos middelware en un arreglo
router.put('/savePdf', [verificarToken, fileUploadMiddleware], PdfController.savePdf);
router.delete('/delFile/:nombre', verificarToken, PdfController.delFile);
router.get('/getPdfsObra/:id', verificarToken, PdfController.getPdfsObra);

module.exports = router;